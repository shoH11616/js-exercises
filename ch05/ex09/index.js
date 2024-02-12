export function parseJson(str) {
    try {
      let data = JSON.parse(str);
      return { success: true, data: data };
    } catch (error) {
      return { success: false, error: error.toString() };
    }
  }
  