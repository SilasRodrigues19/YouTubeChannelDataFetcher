const API_KEY = import.meta.env.PUBLIC_YOUTUBE_API_KEY;

document.addEventListener('DOMContentLoaded', () => {
  const inputQueryElement = document.querySelector('#inputQuery');
  const submitButtonElement = document.querySelector('#submitButton');
  const videoDataElement = document.querySelector('#videoData');
  const titleElement = document.querySelector('#title');
  const descriptionElement = document.querySelector('#description');

  submitButtonElement.addEventListener('click', () => {
    const query = inputQueryElement.value;
    if(!!query) fetchVideoData(query);
  });

  const fetchVideoData = (query) => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&type=video&key=${API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then(({ items }) => {
        if (items && items.length > 0) {
          const videoData = items[0].snippet;
          const title = videoData.title;
          let description = videoData.description;

          const linkRegex = /https?:\/\/[^\s]+/g;
          if (linkRegex.test(description)) {
            description = description.replace(linkRegex, match => {
              return `<a class="text-indigo-500 hover:underline" href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`;
            });
          }

          titleElement.textContent = title;
          descriptionElement.innerHTML = description;
          videoDataElement.style.display = 'block';
        } else {
          titleElement.textContent = 'Nenhum resultado';
          descriptionElement.textContent = '';
          videoDataElement.style.display = 'block';
        }
      })
      .catch((error) => {
        console.error('Ocorreu um erro:', error);
      });
  };
});
