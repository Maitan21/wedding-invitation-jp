let formData = {};
// D-day 설정 (YYYY-MM-DD 형식)
const dday = new Date('2024-10-19'); // 예: 2024년 12월 25일

// 현재 날짜 가져오기
const today = new Date();

// D-day와 현재 날짜의 차이 계산 (밀리초 단위)
const diffTime = dday - today;

// 일 단위로 변환
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

// 결과 표시
const countdownElement = document.getElementById('countdown');

if (diffDays >= 0) {
  countdownElement.innerHTML = `<span style="color: #ea7664; font-weight:bold;"> ${diffDays}</span>일 남았습니다.`;
} else {
    countdownElement.innerHTML = ` <span style="color: #ea7664; font-weight:bold;">${Math.abs(diffDays)}</span>일 지났습니다.`;
}

function oninputPhone(target) {
    target.value = target.value
    .replace(/[^0-9]/g, '')
    .replace(/(^0[789]0)([0-9]{4})([0-9]{4})|(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g, function(_, p1, p2, p3, p4, p5, p6) {
        if (p1 && p2 && p3) {
            return p1 + '-' + p2 + '-' + p3;
        } else {
            return p4 + '-' + p5 + '-' + p6;
        }
    });
}


const send = async (form) =>{
    confetti({
        origin: { y: 1 },
        zIndex: 1057
    });    
    event.preventDefault(); 

    const presence = form.querySelector('#presence').checked;
    const name = form.querySelector('#name').value;
    const phoneNumber = form.querySelector('#phonenumber').value;
    const email = form.querySelector('#email').value;
    const allergy = form.querySelector('#allergy').value;
    const button = form.querySelector('button[type="submit"]');
    const koreaSelected = form.querySelector('input[id="Korea"]:checked') !== null;
    const japanSelected = form.querySelector('input[id="Japan"]:checked') !== null;
    const regionCheckbox = form.querySelector('#terms-checkbox-37').checked;

    // 국가 코드를 설정합니다.
    let countryCode = "";
    if (koreaSelected) {
        countryCode = "+82";
    } else if (japanSelected) {
        countryCode = "+81";
    }

        // JSON 객체를 생성합니다.
    formData = {
        presence,
        name,
        phoneNumber: `${countryCode} ${phoneNumber}`,
        email,
        allergy,
        regionCheckbox
    };
    let html_txt = `<div class="row"> <div class="col-4"> <p class="ft-gowundodum formTitle">참석여부 |</p> </div> <div class="col-8"> <p class="ft-gowundodum formContext" style="color:red">${presence ? '참석' : '미참석'}</p> </div> </div>`;
    html_txt += `<div class="row"> <div class="col-4"> <p class=" ft-gowundodum formTitle">성함 |</p> </div> <div class="col-8"> <p class=" ft-gowundodum formContext">${name}</p> </div> </div>`;
    html_txt += `<div class="row"> <div class="col-4"> <p class=" ft-gowundodum formTitle">전화번호 |</p> </div> <div class="col-8"> <p class=" ft-gowundodum formContext">${countryCode} ${phoneNumber}</p> </div> </div>`;
    html_txt += `<div class="row"> <div class="col-4"> <p class=" ft-gowundodum formTitle">메일주소 |</p> </div> <div class="col-8"> <p class=" ft-gowundodum formContext">${email}</p> </div> </div>`;
    html_txt += `<div class="row"> <div class="col-4"> <p class=" ft-gowundodum formTitle">알레르기 |</p> </div> <div class="col-8"> <p class=" ft-gowundodum formContext">${allergy}</p> </div> </div>`;
    html_txt += `<div class="row"> <div class="col-4"> <p class=" ft-gowundodum formTitle">거주 지역 |</p> </div> <div class="col-8"> <p class=" ft-gowundodum formContext" style="color:red"> ${regionCheckbox ? '간사이 이외' : '간사이'}</p> </div> </div>`;
       // HTML 문자열을 생성합니다.
    document.getElementById('form-confirm').innerHTML = html_txt;
    $('#form-confirm').data('form', formData);
    (new bootstrap.Modal('#modal-confirm')).show();
}

const confirm = () =>{
    const data = $('#form-confirm').data('form');
    $.ajax({
        url: `https://script.google.com/macros/s/AKfycbyip8HaOXhabHgPFKNCRMumdDtzxXloAniEE_vEp4aUB2N0K64KFU7P_E7pzSYk5Tw6uQ/exec`, // form의 action 속성으로 URL 설정
        type: `POST`, // form의 method 속성으로 요청 방식 설정
        data: data, // form 데이터 설정
        success: function(response){
            // 성공 시 수행할 작업                   
            formData = {};
            alert("전송되었습니다.")
            document.getElementById('form').reset();
            $('#modal-confirm').modal('hide');
        },
        error: function(xhr, status, error){
            // 오류 시 수행할 작업
            alert("전송에 실패하였습니다. 문의하기로 문의해주세요.")
        }
    });        
}

const cancle = async (button) =>{
    //마지막 초기화
    formData = {};
    document.getElementById('form').reset();
}

const inquiry = async (button) =>{
    (new bootstrap.Modal('#modal-inquiry')).show();
    
}