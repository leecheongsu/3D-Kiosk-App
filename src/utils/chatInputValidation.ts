const validateInput = (name, password, text): string => {
  // 숫자를 포함하고 있는지 확인
  const hasNumber = (str: string) => /\d/.test(str);
  // 영어 또는 숫자만 갖고있는지 확인
  const validatePassword = (str: string) => /^[A-Za-z0-9+]*$/.test(str);
  const isNotCompletedKorean = (str: string) => /[ㄱ-ㅎ|ㅏ-ㅣ]/.test(str);
  if (name.value.trim()?.length === 0) {
    name.value = '';
    return '이름을 입력해주세요.\nName is required';
  }
  if (isNotCompletedKorean(name.value)) {
    name.value = '';
    return '올바른 이름을 입력해주세요.\nName is not correct';
  }
  if (name.value.trim().length >= 25) {
    return '이름은 25 글자 이하로 입력해주세요.\nMax size of name field is 25';
  }
  if (name.value.trim()?.length > 12) {
    name.value = '';
    return '이름을 입력해주세요.\nName is required';
  }
  if (hasNumber(name.value)) {
    return '이름에는 숫자가 포함될 수 없습니다.\nName cannot contain number';
  }
  if (password.value.length !== 4) {
    return '4자리의 비밀번호를 입력해주세요.\nPlease enter a 4-digit password.';
  }
  if (!validatePassword(password.value)) {
    return '비밀번호는 영문 또는 숫자만 포함 가능합니다.\nPassword only can have alphabet or number';
  }
  if (text.value.trim()?.length === 0) {
    return '내용을 입력해주세요.\nPlease enter the comments.';
  }
  if (text.value.trim()?.length > 250) {
    return '내용은 250글자 이하로 입력해주세요.\nMax size of text field is 250.';
  }
  return '';
};

export default validateInput;
