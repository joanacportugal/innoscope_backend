function getLoginErrors(email: string, name: string): string {
  if (!email || !name) {
    return "Please provide email and name!";
  }

  const emailParts = email.split("@");
  if ((emailParts.length != 2 && emailParts[0] == "") || emailParts[1] == "") {
    return "Please provide a valid email!";
  }
  if (emailParts[1] != "devscope.net") {
    return "Please provide a DevScope email!";
  }
  return "";
}

export { getLoginErrors };
