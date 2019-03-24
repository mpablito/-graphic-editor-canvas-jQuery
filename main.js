function readURL(input) {
    if (input.files && input.files[0]) {
        $(".fa-upload").css("color", "black");
    }else{
      $(".fa-upload").css("color", "black");
    }
}
$("#upload-file").change(function () {
    readURL(this);
});
//kod odpowiadający za zmianę wyglądu "dodaj obraz"

let img = new Image();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let fileName = "";

$("#upload-file").on("change", function () {
    const file = document.querySelector("#upload-file").files[0];
    const reader = new FileReader();
    if (file) {
        fileName = file.name;
        reader.readAsDataURL(file);
    }
    reader.addEventListener("load", function () {
        img = new Image();
        img.src = reader.result;
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            $("#canvas").removeAttr("data-caman-id");
        }
    }, false);
});
//ładowanie obrazka do canvas

let actualName;
$("#download-btn").on("click", function (e) {
    const fileExtension = fileName.slice(-4);
    if (fileExtension == ".jpg" || fileExtension == ".png") {
        actualName = fileName.substring(0, fileName.length - 4);
        //odejmuje 4 znaki czyli z końca .jpg lub .png, w przypadku sporo rzadziej stosowanego rozszerzenia .jpeg plik zostanie nazwany "undefined-edytowany.jpg", można by dodać oddzielnego if'a (jpeg), który kasuje 5 znaków, ale nie jest to jednak według mnie jakiś znaczący problem i nie ma wpływu na funkcjonowanie programu, więc to zostawiłem.
    }
    download(canvas, actualName + "-edytowany.jpg");
    //dodanie do nazwy pliku "-edytowany"
});

function download(canvas, filename) {
    let e;
    const lnk = document.createElement("a");
    lnk.download = filename;
    lnk.href = canvas.toDataURL("image/jpeg", 0.8);
    if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
    }
}
//kod odpowiedzialny za zapisywanie obrazka

$('#brightness-inc').on('click', function (e) {
    Caman('#canvas', img, function () {
        this.brightness(6).render();
    });
});
//podnosi jasność
$('#brightness-dec').on('click', function (e) {
    Caman('#canvas', img, function () {
        this.brightness(-6).render();
    });
});
//obniża jasność

$('#sepia-inc').on('click', function (e) {
    Caman('#canvas', img, function () {
        this.sepia(10).render();
    });
});
//wzmiacnia efekt sepia
$('#sepia-dec').on('click', function (e) {
    Caman('#canvas', img, function () {
        this.sepia(-10).render();
    });
});
//osłabia efekt sepia

$('#contrast-inc').on('click', function (e) {
    Caman('#canvas', img, function () {
        this.contrast(7).render();
    });
});
//podnosi kontrast

$('#contrast-dec').on('click', function (e) {
    Caman('#canvas', img, function () {
        this.contrast(-7).render();
    });
});
//obniża kontrast

$('#saturation-inc').on('click', function (e) {
    Caman('#canvas', img, function () {
        this.saturation(10).render();
    });
});
//podnosi nasycenie

$('#saturation-dec').on('click', function (e) {
    Caman('#canvas', img, function () {
        this.saturation(-10).render();
    });
});
//obniża nasycenie

$('#blur-inc').on('click', function (e) {
    Caman('#canvas', img, function () {
        this.gaussianBlur().render();
    });
});
//dodaje filtr rozmycia Gaussian Blur

$('#noise-inc').on('click', function (e) {
    Caman('#canvas', img, function () {
        this.noise(5).render();
    });
});
//dodaje efekt ziarna

$('#nostalgia-btn').on('click', function (e) {
    Caman('#canvas', img, function () {
        this.nostalgia().render();
    });
});
//efekt nostalgia

$('#vintage-btn').on('click', function (e) {
    Caman('#canvas', img, function () {
        this.vintage().render();
    });
});
//efekt vintage

$('#sinCity-btn').on('click', function (e) {
    Caman('#canvas', img, function () {
        this.sinCity().render();
    });
});
//efekt sinCity

document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);

// ostatnia znana pozycja
let pos = {
    x: 0,
    y: 0
};

// nowa pozycja wyciągnięta z mouse events
function setPosition(e) {
    pos.x = e.clientX;
    pos.y = e.clientY;
}
function draw(e) {
    if (e.buttons !== 1) return; // kiedy mysz jest wciśnięta

    const color = document.getElementById("hex").value;
    //pobiera wartość koloru hex wpisaną na stronie

    ctx.beginPath(); // rozpoczęcie rysowania

    ctx.lineWidth = 6; // grubość pędzla
    ctx.lineCap = "round"; // odpowiada za zaokrąglenie pędzla
    ctx.strokeStyle = color; // przypisuje wartość color do linii pędzla

    ctx.moveTo(pos.x, pos.y);
    setPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke(); // rysuje
}