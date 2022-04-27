
// DESIMTA UŽDUOTIS:
// 1. Studento kūrimo ir redagavimo metu reikia sukurti visų studentų masyvą (tokiu pačiu formatu kaip ir INITIAL_STUDENT_DATA).
// 2. Šį masyvą pridėti į localStorage.
// 3. Puslapio perkrovimo metu iš localStorage esančio masyvo sukurti studentų sąrašą (pradinių studentų sukūrimo funkcionalumas).
let studentsLocalStorage = JSON.parse(localStorage.getItem('initialStudentsData'));

const INITIAL_STUDENT_DATA = studentsLocalStorage ? studentsLocalStorage : [];




// const INITIAL_STUDENT_DATA = [
//     {
//         name: 'Vardas 1',
//         surname: 'Pavarde 1',
//         age: 20,
//         phone: '+370654654654',
//         email: 'vardas1@imone.lt',
//         itKnowledge: 5,
//         group: 10,
//         interests: [
//             'JavaScript',
//             'TypeScript',
//             'Node',
//             'React Native'
//         ]
//     },
//     {
//         name: 'Vardas 2',
//         surname: 'Pavarde 2',
//         age: 35,
//         phone: '+370654654654',
//         email: 'vardas2@imone.lt',
//         itKnowledge: 5,
//         group: 10,
//         interests: [
//             'JavaScript',
//             'TypeScript',
//             'Node',
//             'React Native'
//         ]
//     },
//     {
//         name: 'Vardas 3',
//         surname: 'Pavarde 3',
//         age: 32,
//         phone: '+370654654654',
//         email: 'vardas3@imone.lt',
//         itKnowledge: 5,
//         group: 10,
//         interests: [
//             'JavaScript',
//             'TypeScript',
//             'Node',
//             'React Native'
//         ]
//     },
//     {
//         name: 'Vardas 4',
//         surname: 'Pavarde 4',
//         age: 25,
//         phone: '+370654654654',
//         email: 'vardas4@imone.lt',
//         itKnowledge: 5,
//         group: 10,
//         interests: [
//             'JavaScript',
//             'TypeScript',
//             'Node',
//             'React Native'
//         ]
//     },
//     {
//         name: 'Vardas 5',
//         surname: 'Pavarde 5',
//         age: 18,
//         phone: '+370654654654',
//         email: 'vardas5@imone.lt',
//         itKnowledge: 5,
//         group: 10,
//         interests: [
//             'JavaScript',
//             'TypeScript',
//             'Node',
//             'React Native'
//         ]
//     },
// ];


let studentForm = document.querySelector('#student-form');

let editStudent = null;


studentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // console.log(event.target.elements.group.value);

    let validForm = formErrorHandler(studentForm);
    if (!validForm) {
        return;
    }



    let formInterests = document.querySelectorAll('input[name=interest]:checked');
    let interestValues = [...formInterests].map(element => {
        return element.value;
    });


    let studentFormData = {
        name: document.querySelector('input[name=name]').value,
        surname: document.querySelector('#student-surname').value,
        age: event.target.elements.age.value,
        phone: studentForm.querySelector('#student-phone').value,
        email: document.querySelector('#student-email').value,
        itKnowledge: event.target.elements['it-knowledge'].value,
        group: event.target.elements.group.value,
        interests: interestValues,
    };



    if (editStudent) {
        alertMessage(`Student edited (${studentFormData.name} ${studentFormData.surname})`);

    } else {
        alertMessage(`Student created (${studentFormData.name} ${studentFormData.surname})`);
    }

    renderStudent(studentFormData);

    studentForm.reset();
    itKnowledgeOutputReset();
});
function itKnowledgeOutputReset() {
    let itKnowledgeElement = document.querySelector('#student-it-knowledge');
    let itKnowledgeOutput = document.querySelector('#it-knowledge-output');
    itKnowledgeOutput.textContent = itKnowledgeElement.value;
    itKnowledgeElement.addEventListener('input', () => {
        itKnowledgeOutput.textContent = itKnowledgeElement.value;
    });
}
function alertMessage(text, elementClass = '') {
    let alertElement = document.querySelector('#alert');
    alertElement.textContent = text;
    if (elementClass) {
        alertElement.classList.add(elementClass);
    }
    setTimeout(() => {
        alertElement.textContent = '';
        if (elementClass) {
            alertElement.classList.remove(elementClass);
        }
    }, 5000);
}
function renderInitialStudentData(students) {

    if (!students) {
        return;
    }
    students.map((student) => {
        renderStudent(student);
    });
}

function renderStudent(studentData) {
    let personName = studentData.name;
    let personSurname = studentData.surname;
    let personAge = studentData.age;
    let personPhone = studentData.phone;
    let personEmail = studentData.email;
    let personItKnowledge = studentData.itKnowledge;
    let personGroup = studentData.group;
    let interests = studentData.interests;
    let studentsList = document.querySelector('#students-list');
    let studentItem = document.createElement('div');
    studentItem.classList.add('student-item');
    let studentNameEl = document.createElement('p');
    studentNameEl.innerHTML = `<strong>Name: </strong><span class="student-name">${personName}</span>`;
    let studentSurnameEl = document.createElement('p');
    studentSurnameEl.innerHTML = `<strong>Surname: </strong><span class="student-surname">${personSurname}</span>`;
    let studentAgeEl = document.createElement('p');
    studentAgeEl.innerHTML = `<strong>Age: </strong><span class="student-age">${personAge}</span>`;
    let studentPhoneEl = document.createElement('p');
    studentPhoneEl.innerHTML = `<strong>Phone: </strong><span class="hidden-area">****</span>`;
    let studentEmailEl = document.createElement('p');
    studentEmailEl.innerHTML = `<strong>Email: </strong><span class="hidden-area">****</span>`;
    let studentItKnowledgeEl = document.createElement('p');
    studentItKnowledgeEl.innerHTML = `<strong>IT Knowledge: </strong><span class="student-it-knowledge">${personItKnowledge}</span>`;
    let studentGroupEl = document.createElement('p');
    studentGroupEl.innerHTML = `<strong>Group: </strong><span class="student-group">${personGroup}</span>`;
    let interestWrapperEl = document.createElement('div');
    let interestTitleEl = document.createElement('h4');
    interestTitleEl.textContent = 'Interests:';
    let studentInterestsEl = document.createElement('ul');
    interests.forEach((interest) => {
        let interestItem = document.createElement('li');
        interestItem.textContent = interest;
        studentInterestsEl.append(interestItem);
    });
    interestWrapperEl.append(interestTitleEl, studentInterestsEl);
    let privateInfoButton = document.createElement('button');
    privateInfoButton.textContent = 'Rodyti asmens duomenis';
    privateInfoButton.addEventListener('click', () => {
        if (privateInfoButton.classList.contains('hide')) {
            studentPhoneEl.querySelector('.hidden-area').textContent = '****';
            studentEmailEl.querySelector('.hidden-area').textContent = '****';
            privateInfoButton.textContent = 'Rodyti asmens duomenis';
        } else {
            studentPhoneEl.querySelector('.hidden-area').textContent = personPhone;
            studentEmailEl.querySelector('.hidden-area').textContent = personEmail;
            privateInfoButton.textContent = 'Slėpti asmens duomenis';
        }
        privateInfoButton.classList.toggle('hide');
    });
    let deleteStudentButton = document.createElement('button');
    deleteStudentButton.textContent = 'Ištrinti studentą';
    deleteStudentButton.addEventListener('click', () => {
        studentItem.remove();
        alertMessage(`Studentas (${personName} ${personSurname}) sėkmingai ištrintas.`);
    });


    // 1. Sukurti Edit mygtuką


    let editStudentButton = document.createElement('button');
    editStudentButton.textContent = 'Redaguoti studento duomenis';

    // 2. Prie mygtuko pridėti event listener'į

    editStudentButton.addEventListener('click', () => {
        console.log(personName);
        console.log(personSurname);
        console.log(personAge);
        console.log(personPhone);
        console.log(personEmail);
        console.log(personItKnowledge);
        // 3. Surinkti studento duomenis ir jais užpildyti formos laukelius.
        studentForm.querySelector('#student-name').value = personName;
        studentForm.querySelector('#student-surname').value = personSurname;
        studentForm.querySelector('#student-age').value = personAge;
        studentForm.querySelector('#student-phone').value = personPhone;
        studentForm.querySelector('[name=email]').value = personEmail;
        studentForm.querySelector('#student-it-knowledge').value = personItKnowledge;
        studentForm.elements.group.value = personGroup;


        console.log(studentForm.elements.interest)
        console.log(interests);


        interests.map(singleInterest => {
            studentForm.elements.interest.forEach(formInterest => {
                if (singleInterest === formInterest.value) {
                    formInterest = true;
                }
            })
        });

        itKnowledgeOutputReset();


        // 4. Pakeisti formos sbmit mygtuko tekstą.
        studentForm.querySelector('[type=submit]').value = 'Save changes';


        // 5. Išsaugoti studento HTML elementą kintamajame.
        editStudent = studentItem;
    })


    studentItem.append(studentNameEl, studentSurnameEl, studentAgeEl, studentPhoneEl, studentEmailEl, studentItKnowledgeEl, studentGroupEl, interestWrapperEl, privateInfoButton, deleteStudentButton, editStudentButton);


    let studentsDataArray = [studentData, ...INITIAL_STUDENT_DATA];
    localStorage.setItem('initialStudentsData', JSON.stringify(studentsDataArray));
    // console.log(INITIAL_STUDENT_DATA);
    // console.log(studentsDataArray);

    // console.log(studentsDataArray.concat(INITIAL_STUDENT_DATA));
    // console.log(...INITIAL_STUDENT_DATA, ...studentsDataArray); 2-as  budas uzrasyti

    // console.log(...INITIAL_STUDENT_DATA, studentData);


    // localStorage.setItem('initialStudentsData',);



    // 6. Submit event'o metu patikrinti ar kiuriame naują studentą ar redaguojame jau sukurtą.

    if (editStudent) {
        // 7. Jeigu studentas redaguojamas, šiuo naują (redaguotą) HTML elementą panaudoti perrašant seną studento HTML elementą (kuris išsaugotas 5 žingsnyje)

        // editStudent kintamasis saugo originalaus studentItem reikšmę.
        console.log(editStudent);

        // studentItem kintamasis saugo dabartinės formos reikšmę sukurtą studentą
        console.log(studentItem);
        //    editStudent.innerHTML = studentItem.innerHTML;
        editStudent.replaceWith(studentItem);
        editStudent = null;

        // 8. Pakeisti formos submit mygtuko tekstą į pradinį ir pakeisti iššokančio pranešimo tekstą.

        studentForm.querySelector('[type=submit]').value = 'Submit;'

    } else {
        studentsList.prepend(studentItem);
    }
}

function formErrorHandler(form) {
    let inputErrorMessages = form.querySelectorAll('.input-error-message');
    inputErrorMessages.forEach(message => message.remove());
    form.querySelectorAll('input.input-error').forEach(input => input.classList.remove('input-error'));
    let requiredInputs = form.querySelectorAll('input.required');
    let formValid = true;
    requiredInputs.forEach(input => {
        if (!input.value) {
            formValid = false;
            inputErrorMessage(input, 'Šis laukelis yra privalomas');
        } else {
            if (input.name === 'name') {
                if (input.value.length < 3) {
                    inputErrorMessage(input, 'Vardas yra per trumpas. Jis turėtų būti bent 3 simbolių ilgio.');
                    formValid = false;
                }
            }
            if (input.name === 'surname') {
                if (input.value.length < 3) {
                    inputErrorMessage(input, 'Pavardė yra per trumpa. Ji turėtų būti bent 3 simbolių ilgio.');
                    formValid = false;
                }
            }
            if (input.name === 'age') {
                if (input.value < 0) {
                    inputErrorMessage(input, 'Amžius privalo būti teigiamas skaičius.');
                    formValid = false;
                }
                if (input.value > 120) {
                    inputErrorMessage(input, 'Įvestas amžius yra per didelis. Maksimalus amžius yra 120 metų.');
                    formValid = false;
                }
            }
            if (input.name === 'phone') {
                if (input.value.length < 9 || input.value.length > 12) {
                    inputErrorMessage(input, 'Įvestas telefono numeris yra neteisingas');
                    formValid = false;
                }
            }
            if (input.name === 'email') {
                if (!input.value.includes('@')) {
                    inputErrorMessage(input, 'Įvestas elektroninis paštas yra neteisingas');
                    formValid = false;
                }
            }
        }
    })
    return formValid;
}
function inputErrorMessage(inputElement, errorMessage) {
    inputElement.classList.add('input-error');
    alertMessage('Ne visi laukeliai yra užpildyti.', 'error-alert');
    let inputError = document.createElement('span');
    inputError.textContent = errorMessage;
    inputError.classList.add('input-error-message');
    inputElement.after(inputError);
}


// 2. Šiam kintamąjam pridėti event listener'į - jo tipas submit.
let searchForm = document.querySelector('#search');

// 3. Submit metu, išsaugoti duomenis, kurie įvesti paieškos formoje (text input'e).
// 4. Patobulinti formą, kad studento būtų ieškoma ne tik pagal vardą ir pavardę, tačiau ir pagal pasirinktą atributą.

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let searchInput = event.target.elements.search.value.toLowerCase();
    console.log(searchInput);

    let searchVariation = event.target.elements.variations.value;
    console.log(searchVariation);


    // 4. Selektinti visus studentų elementus, jis pridedam į kintamąjį.
    let students = document.querySelectorAll('.student-item');


    // 5. Leisti ciklą per studentų masyvą ir kiekvieno ciklo metu:
    students.forEach(student => {
        // student.style.display = 'none';


        // 5.1. Paselektinti studento vardą.
        let studentName = student.querySelector('.student-name').textContent.toLowerCase();

        let studentSurname = student.querySelector('.student-surname').textContent.toLowerCase();

        let studentAge = student.querySelector('.student-age').textContent.toLowerCase();

        let studentItKnowledge = student.querySelector('.student-it-knowledge').textContent.toLowerCase();

        let studentGroup = student.querySelector('.student-group').textContent.toLowerCase();

        // 5.2. Paselektinti studento pavardę.
        // 5.3. Patikrinti ar varde arba pavardėje yra ieškoma frazė.

        // if (studentName.includes(searchInput.toLowerCase()) || studentSurname.includes(searchInput.toLowerCase())) {
        // 5.3.2. Jeigu yra, tai reikia parodyti studento elementą (display: block).
        // student.style.display = 'block';
        // 5.3.1. Jeigu nėra, tai reikia paslėpti studento elementą (display: none).
        // } else {
        //     student.style.display = 'none';
        // }

        switch (searchVariation) {
            case 'name':
                if (studentName.includes(searchInput)) {
                    student.style.display = 'block';
                } else {
                    student.style.display = 'none';
                }
                break;

            case 'surname':
                if (studentSurname.includes(searchInput)) {
                    student.style.display = 'block';
                } else {
                    student.style.display = 'none';
                }
                break;

            case 'age':
                if (studentAge == searchInput) {
                    student.style.display = 'block';
                } else {
                    student.style.display = 'none';
                }
                break;


            case 'student-it-knowledge':
                if (studentItKnowledge == searchInput) {
                    student.style.display = 'block';
                } else {
                    student.style.display = 'none';
                }
                break;

            case 'group':
                if (studentGroup.includes(searchInput)) {
                    student.style.display = 'block';
                } else {
                    student.style.display = 'none';
                }
                break;

            default:
                console.log('Netinkamas')
        }

    })
})


// 2022.04.26-----------------------------------------------------


// let test = 'Labas rytas';
// localStorage.setItem('testItem', test);
// localStorage.removeItem('testItem');

// console.log(localStorage.getItem('testItem'))

// z Ilgasis variantas
// studentForm.addEventListener('input', (event) => {


//     let name = studentForm.querySelector('#student-name').value;
//     let surname = studentForm.querySelector('#student-surname').value;
//     let age = studentForm.querySelector('#student-age').value;
//     let phone = studentForm.querySelector('#student-phone').value;
//     let email = studentForm.querySelector('#student-email').value;
//     let itKnowledge = studentForm.querySelector('#student-it-knowledge').value;
//     let group = studentForm.elements.group.value;



//     localStorage.setItem('student-name', name);
//     localStorage.setItem('student-surname', surname);
//     localStorage.setItem('student-age', age);
//     localStorage.setItem('student-phone', phone);
//     localStorage.setItem('student-email', email);
//     localStorage.setItem('student-it-knowledge', itKnowledge);
//     localStorage.setItem('student-group', group);

// });

// studentForm.querySelector('#student-name').value = localStorage.getItem('student-name');
// studentForm.querySelector('#student-surname').value = localStorage.getItem('student-surname');
// studentForm.querySelector('#student-age').value = localStorage.getItem('student-age');
// studentForm.querySelector('#student-phone').value = localStorage.getItem('student-phone');
// studentForm.querySelector('#student-email').value = localStorage.getItem('student-email');
// studentForm.querySelector('#student-it-knowledge').value = localStorage.getItem('student-it-knowledge');
// studentForm.elements.group.value = localStorage.getItem('student-group');


// z Sutrumpintas variantas

// studentForm.addEventListener('input', (event) => {

//     console.log(event.target.name);
//     console.log(event.target.value);

//     let inputName = event.target.name;
//     let inputValue = event.target.value;
//     localStorage.setItem(inputName, inputValue);
// });

// studentForm.querySelector('#student-name').value = localStorage.getItem('name');
// studentForm.querySelector('#student-surname').value = localStorage.getItem('surname');
// studentForm.querySelector('#student-age').value = localStorage.getItem('age');
// studentForm.querySelector('#student-phone').value = localStorage.getItem('phone');
// studentForm.querySelector('#student-email').value = localStorage.getItem('email');
// studentForm.querySelector('#student-it-knowledge').value = localStorage.getItem('it-knowledge');
// studentForm.elements.group.value = localStorage.getItem('group');



// z Trecias variantas
studentForm.addEventListener('input', (event) => {

    let formInfo = {
        name: studentForm.querySelector('#student-name').value,
        surname: studentForm.querySelector('#student-surname').value,
        age: studentForm.querySelector('#student-age').value,
        phone: studentForm.querySelector('#student-phone').value,
        email: studentForm.querySelector('#student-email').value,
        itKnowledge: studentForm.querySelector('#student-it-knowledge').value,
        group: studentForm.elements.group.value,
        interests: []
    }

    studentForm.querySelectorAll('input[name=interest]:checked').forEach(interest => {
        formInfo.interests.push(interest.id);
    });

    // if (event.target.name === 'interest') {
    //     console.log(event.target.value);
    //     formInfo.interests.push(event.target.value);
    // }


    // let formInfoInString = JSON.stringify(formInfo);  - galima taip rasyti arba taip:
    localStorage.setItem('form-info', JSON.stringify(formInfo));

});

let localStorageFormInfo = JSON.parse(localStorage.getItem('form-info'));



studentForm.querySelector('#student-name').value = localStorageFormInfo.name;
studentForm.querySelector('#student-surname').value = localStorageFormInfo.surname;
studentForm.querySelector('#student-age').value = localStorageFormInfo.age;
studentForm.querySelector('#student-phone').value = localStorageFormInfo.phone;
studentForm.querySelector('#student-email').value = localStorageFormInfo.email;
studentForm.querySelector('#student-it-knowledge').value = localStorageFormInfo.itKnowledge;
studentForm.elements.group.value = localStorageFormInfo.group;


console.log(localStorageFormInfo.interests);

localStorageFormInfo.interests.forEach(interest => {
    studentForm.querySelector(`input#${interest}`).checked = true;
})

renderInitialStudentData(INITIAL_STUDENT_DATA);
itKnowledgeOutputReset();