const helperText = document.querySelector('#helper-text');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadLgoutPage();
    } catch (e) {
        console.log(e);
    }
});

//NOTE: 페이지 로드
const loadLgoutPage = async () => {
    try {
        const { data: userInfo } = await axios.get(userInfoUrl);
        profileImg.src = userInfo.data.profile_img;
        document.querySelector('#user-email').innerText = userInfo.data.email;
        document.querySelector('#nickname').value = userInfo.data.nickname;
    } catch (e) {
        console.log(e);
    }
};

//NOTE: 회원정보 수정
document.querySelector('.edit-btn').addEventListener('click', async () => {
    try {
        const formData = new FormData();
        const nickname = document.querySelector('#nickname').value;
        const profile_img = document.querySelector('#file').files[0];

        formData.append('nickname', nickname);
        formData.append('profile_img', profile_img);
        console.log(profile_img);
        const response = await axios.patch(userInfoUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status == 201) {
            alert('수정 완료!');
            location.reload();
        }
    } catch (e) {
        errorMessage = e.response.data.message;
        console.log(e);
        if (errorMessage == '입력한 값이 비었습니다.') {
            helperText.innerText = '닉네임을 입력해주세요.';
        } else if (errorMessage == '중복된 닉네임 입니다.') {
            helperText.style.display = 'flex';
            helperText.innerText = '중복된 닉네임 입니다.';
        } else {
            alert('존재하지 않는 회원입니다.');
        }
    }
});

//NOTE: 회원 탈퇴
document.querySelector('.modal-btn2').addEventListener('click', async () => {
    try {
        const response = await axios.delete(userInfoUrl);

        if (response.status == 201) {
            alert('회원 삭제 완료!');
            location.href = '/';
        }
    } catch (e) {
        console.log(e);
        alert(e.response.data.message);
    }
});