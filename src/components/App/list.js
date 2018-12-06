import React from 'react';

export const List = ({ paths, activePath, updateActive, search }) => {
  const classList = "list-group-item list-group-item-action pointer flex-column align-items-start mh-150 overflow-hidden";
  
  const setActive = (path) => {
    updateActive(path);
  }
  
  const sortedPaths = paths.sort((a, b) => {
    return (a.isPrimary === b.isPrimary) ? 0 : a.isPrimary ? -1 : 1;
  });

  const searchFilter = !search ? sortedPaths : sortedPaths.filter((path) => {
    return (
      path.title.toLowerCase().search(search.toLowerCase()) !== -1 ||
      path.full.toLowerCase().search(search.toLowerCase()) !== -1
    )
  })

  return (
   searchFilter.map((path, i) => {
      return (
          <div id={path.id} key={i} className={activePath.id === path.id ? classList + " active" : classList} onClick={() => setActive(path)}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1 overflow-hidden">
                
                <div className={path.isPrimary ? "min-w-15 mr-2 d-inline-block" : "d-none"}>
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="far" data-icon="star" className="svg-inline--fa fa-star fa-w-18" role="img" viewBox="0 0 576 512">
                    <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
                  </svg>
                </div>

                {path.title}
                
              </h5>
              <small className="font-weight-bold">{path.length} km</small>
            </div>
            <p className="mb-1">{path.short}</p>
          </div>
      )
    })
   )
};