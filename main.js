
const cardContainer = document.getElementById("card-cont")

const getData = (url) => {
    return new Promise((resolved, rejected) => {
        let http = new XMLHttpRequest();
        http.open("GET", url);
        http.send();
        http.addEventListener("readystatechange", function (e) {
            if (http.readyState == 4) {
                if (http.status == 200) {
                    resolved(http.response);
                } else {
                    rejected(Error('error'));
                }
            }
        });
    });
}


getData("https://jsonplaceholder.typicode.com/posts")
    .then(data => {
        let result = JSON.parse(data)
        console.log(result);
        for (let i = 0; i < result.length; i++) {
            let element = result[i];
            cardContainer.innerHTML += `              
                <div class="col">
                    <div class="card h-100">
                        <div class="card-header">Card ID ${element.id}</div>
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.body}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-body-secondary">User ID ${element.userId}</small>
                        </div>
                    </div>
                </div>`;
        }
    })
    .catch(err => {
        console.log(err);
        cardContainer.innerHTML = `
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <h1 class="display-1 text-center text-bg-danger">Error 404</h1>
                </div>
                 <div class="col">
                    <div class="card h-100">
                        <div class="card-header"><span class="placeholder w-25 bg-danger"></span></div>
                        <div class="card-body">
                            <h5 class="card-title"><span class="placeholder w-50 bg-danger"></span></h5>
                            <p class="card-text"><span class="placeholder w-75 bg-danger"></span></p>
                        </div>
                        <div class="card-footer">
                            <small class="text-body-secondary"><span class="placeholder w-25 bg-danger"></span></small>
                        </div>
                    </div>
                </div>`;
    });
