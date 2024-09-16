const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    disableForm();
    const response = await retryWithExponentialBackoff(
      () => fetchWithTimeout("/api/tasks"),
      3
    );
    const data = await response.json();
    data.items.forEach((task) => appendToDoItem(task));
  } catch (error) {
    alert(error.message);
  } finally {
    enableForm();
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  input.value = "";

  try {
    disableForm();
    const response = await retryWithExponentialBackoff(
      () =>
        fetchWithTimeout("/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({ name: todo }),
        }),
      3
    );
    const newTask = await response.json();
    appendToDoItem(newTask);
  } catch (error) {
    alert(error.message);
  } finally {
    enableForm();
  }
});

function appendToDoItem(task) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine =
    task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";
  toggle.addEventListener("change", async () => {
    try {
      disableForm();
      const response = await retryWithExponentialBackoff(
        () =>
          fetchWithTimeout(`/api/tasks/${task.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              status: toggle.checked ? "completed" : "active",
            }),
          }),
        3
      );
      const updatedTask = await response.json();
      label.style.textDecorationLine =
        updatedTask.status === "completed" ? "line-through" : "none";
    } catch (error) {
      alert(error.message);
    } finally {
      enableForm();
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "Delete";
  destroy.addEventListener("click", async () => {
    try {
      disableForm();
      const response = await retryWithExponentialBackoff(
        () =>
          fetchWithTimeout(`/api/tasks/${task.id}`, {
            method: "DELETE",
          }),
        3
      );
      if (response.ok) {
        elem.remove();
      }
    } catch (error) {
      alert(error.message);
    } finally {
      enableForm();
    }
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}

async function retryWithExponentialBackoff(fetchFunc, maxRetry) {
  let attempt = 0;

  while (attempt < maxRetry) {
    try {
      const response = await fetchFunc();
      if (response.ok) {
        return response;
      } else if (response.status >= 500) {
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (error) {
      if (attempt >= maxRetry) {
        throw error;
      }
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempt++;
    }
  }
}

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 3000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

function disableForm() {
  form.querySelector("button").disabled = true;
  input.disabled = true;
  list
    .querySelectorAll("input, button")
    .forEach((elem) => (elem.disabled = true));
}

function enableForm() {
  form.querySelector("button").disabled = false;
  input.disabled = false;
  list
    .querySelectorAll("input, button")
    .forEach((elem) => (elem.disabled = false));
}
