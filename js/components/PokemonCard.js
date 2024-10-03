const dataRow = document.querySelector("[data-pokemon-row]");

export function Pokemon(i) {
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = `<div class="card">
            <img
              src="${i.image}"
              class="card-img-top"
              alt="${i.name}"
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">"${i.description}"</p>
              <a href="${i.link}" class="btn btn-primary">Visit</a>
            </div>
          </div>`;
  dataRow.appendChild(div);
}
