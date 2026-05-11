const passwordChecker = document.getElementById("password-check");
const passwordInput = document.getElementById("password");

console.log(passwordInput);

passwordInput.addEventListener('focus', (event) => {
    passwordChecker.style.display = "block";
})

passwordInput.addEventListener("blur", (event) => {
    passwordChecker.style.display = "none";
});


passwordInput.addEventListener('input', (event) => {
    const inputPassword = event.target.value;
    const lowercaseCheck = document.getElementById('hasLowercase');
    const uppercaseCheck = document.getElementById("hasUppercase");
    const numberCheck = document.getElementById("hasNumber");
    const eightCharactersCheck = document.getElementById("hasEightCharacters");

    if (/[a-záéíóúñ]/.test(inputPassword)) {
      lowercaseCheck.innerHTML = `
            <div class="d-flex align-items-center gap-2" style="color: green; font-weight: 500;"><img src="/img/icons/valid.png" alt="valid" class="me-2" style="width: 16px; height: 16px;"/> <p class="m-0"> Al menos una minúscula</p></div>
        `;
    } else {
      lowercaseCheck.innerHTML = `
            <div class="d-flex align-items-center gap-2" style="color: red; font-weight: 500;"><img src="/img/icons/invalid.png" alt="invalid" class="me-2" style="width: 16px; height: 16px;"/> <p class="m-0"> Al menos una minúscula</p></div>
        `;
    }

    if (/[A-ZÁÉÍÓÚÑ]/.test(inputPassword)) {
      uppercaseCheck.innerHTML = `
            <div class="d-flex align-items-center gap-2" style="color: green; font-weight: 500;"><img src="/img/icons/valid.png" alt="valid" class="me-2" style="width: 16px; height: 16px;"/> <p class="m-0"> Al menos una mayúscula</p></div>
        `;
    } else {
      uppercaseCheck.innerHTML = `
            <div class="d-flex align-items-center gap-2" style="color: red; font-weight: 500;"><img src="/img/icons/invalid.png" alt="invalid" class="me-2" style="width: 16px; height: 16px;"/> <p class="m-0"> Al menos una mayúscula</p></div>
        `;
    }

    if (/\d/.test(inputPassword)) {
      numberCheck.innerHTML = `
            <div class="d-flex align-items-center gap-2" style="color: green; font-weight: 500;"><img src="/img/icons/valid.png" alt="valid" class="me-2" style="width: 16px; height: 16px;"/> <p class="m-0"> Al menos un número</p></div>
        `;
    } else {
      numberCheck.innerHTML = `
            <div class="d-flex align-items-center gap-2" style="color: red; font-weight: 500;"><img src="/img/icons/invalid.png" alt="invalid" class="me-2" style="width: 16px; height: 16px;"/> <p class="m-0"> Al menos un número</p></div>
        `;
    }

    if (inputPassword.length >= 8) {
      eightCharactersCheck.innerHTML = `
            <div class="d-flex align-items-center gap-2" style="color: green; font-weight: 500;"><img src="/img/icons/valid.png" alt="valid" class="me-2" style="width: 16px; height: 16px;"/> <p class="m-0"> Al menos 8 caracteres</p></div>
        `;
    } else {
      eightCharactersCheck.innerHTML = `
            <div class="d-flex align-items-center gap-2" style="color: red; font-weight: 500;"><img src="/img/icons/invalid.png" alt="invalid" class="me-2" style="width: 16px; height: 16px;"/> <p class="m-0"> Al menos 8 caracteres</p></div>
        `;
    }
    

})


