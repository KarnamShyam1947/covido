const imageInput = document.querySelector('#imageInput');
const image = document.querySelector('#image');
const form = document.querySelector('#form');
const result = document.querySelector('#result');
const submitBtn = document.querySelector('#submitBtn');
const imageUrl = document.querySelector('#image-url');
const loader = document.querySelector('.loader_bg');


submitBtn.style.display = 'none';
loader.style.display = 'none';

imageUrl.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        loader.style.display = 'block';
        result.innerHTML = '';
        image.src = '';
        
        const url = imageUrl.value;
        if(url !== '') {
            image.setAttribute('src', url);
            console.log(url);

            predictImageUsingUrl();

            imageUrl.value = '';
        }
    }
})

imageInput.addEventListener('change', () => {
    renderImage();
    submitBtn.style.display = 'block';
    result.innerHTML = '';
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.style.display = 'none';
    loader.style.display = 'block';

    predictImage();
})

function renderImage() {
    let render = new FileReader();
    render.readAsDataURL(imageInput.files[0]);

    console.log(imageInput.files[0]);

    render.onload = () => {
        image.setAttribute('src', render.result);
    };
}

function predictImage() {
    formData = new FormData(form);

    fetch('/predict-image', {
        method: 'POST',
        body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        loader.style.display = 'none';
        renderResult(data);
    })
    .catch((error) => console.log(error));
}

function predictImageUsingUrl() {
    data = {
        'url' : imageUrl.value
    }

    fetch('/predict-image-using-url', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type' : 'application/json'
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        loader.style.display = 'none';
        renderResult(data);
    })
    .catch((error) => console.log(error));
}

function renderResult(data) {
    result.innerHTML = '';
    br = document.createElement('br');

    result.innerHTML += 'Disease : ' + data.class;
    result.append(br);
    result.innerHTML += 'Score : ' + data.score;
}
