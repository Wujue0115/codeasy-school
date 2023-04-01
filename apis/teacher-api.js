export async function getTeacherInfoList() {
  try {
    const response = await fetch("https://mocki.io/v1/237a4f85-ebbc-4e41-a517-55be5807ff61");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[getTeacherInfoList error]", error);
  }
}