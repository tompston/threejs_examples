export function append_reference_grid(references) {
  //   let parent = document.querySelector(parent_class);
  //   let ref_grid = `
  //         <div class="grid references_grid">
  //               <div class="fs-4 font-fam-3 mb-6">References</div>
  //         </div>
  // `;
  //   parent.innerHTML += ref_grid; // append a new div to the scenes grid

  let references_grid = document.querySelector(".references_grid");

  references_grid.innerHTML = `<div class="fs-4 font-fam-3 mb-10 mt-18">References</div>`;

  for (let i = 0; i < references.length; i++) {
    let ref = references[i];

    references_grid.innerHTML += `
    <div class="mb-20">
      <a
            href="${ref}"
            rel="noreferrer"
            target="_blank"
            class="remove-decoration homepage_link"
            >${ref}</a
          >
    </div>
    `;
  }
}
