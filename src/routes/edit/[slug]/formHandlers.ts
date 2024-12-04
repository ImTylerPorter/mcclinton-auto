import type { SectionState, ServiceState } from '../../../types';
import { goto } from '$app/navigation';
import { capitalize } from '$lib/helpers/index';

export function handleFileChange(event: Event, sectionState: SectionState, previewSrc: string) {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;

  if (file) {
    sectionState.image = file;
  } else {
    sectionState.image = null;
  }
  previewSrc = file ? URL.createObjectURL(file) : '';
}

export function handleServiceFileChange(event: Event, index: number, servicesState: ServiceState[]) {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;

  if (file) {
    servicesState[index].imageUrl = file;
    servicesState[index].previewSrc = URL.createObjectURL(file);
  } else {
    servicesState[index].imageUrl = null;
    servicesState[index].previewSrc = null;
  }
}

export async function handleSubmit(event: SubmitEvent, sectionState: SectionState, servicesState: ServiceState[], formError: string, currentPath: string) {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  formData.append('id', sectionState.id);
  formData.append('content', sectionState.content);

  if (sectionState.image && sectionState.image instanceof File) {
    formData.set('image', sectionState.image);
  }

  servicesState.forEach((service, index) => {
    formData.append(`services[${index}][id]`, service.id);
    formData.append(`services[${index}][title]`, service.title);

    if (service.imageUrl && service.imageUrl instanceof File) {
      formData.append(`services[${index}][image]`, service.imageUrl);
    }
  });

  try {
    const response = await fetch(currentPath, {
      method: 'POST',
      body: formData
    });
    const result = await response.json();

    if (response.ok) {
      goto(`/?message=${capitalize(sectionState.sectionName)}%20Successfully%20Updated`);
    } else {
      formError = result.error?.message || 'Operation failed.';
    }
  } catch (err) {
    formError = 'An error occurred.';
  }
}

