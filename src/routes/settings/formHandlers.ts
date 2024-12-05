import type { Settings} from '../../types';
import { goto } from '$app/navigation';

export async function handleSubmit(event: SubmitEvent, settingsState: Settings,  formError: string, currentPath: string) {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  formData.append('id', settingsState.id);

  try {
    const response = await fetch(currentPath, {
      method: 'POST',
      body: formData
    });
    const result = await response.json();

    if (response.ok) {
      goto(`/?message=Settings%20Successfully%20Updated`);
    } else {
      formError = result.error?.message || 'Operation failed.';
    }
  } catch (err) {
    formError = 'An error occurred.';
  }
}

