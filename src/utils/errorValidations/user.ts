function getIdeaCreationErrors(obj: any): string {
  const {
    title,
    summary,
    description,
    category,
    complexity,
    duration,
    technologies,
    coauthors,
  } = obj;

  if (
    !title ||
    !summary ||
    !description ||
    !category ||
    !complexity ||
    !duration
  ) {
    return "Missing required fields.";
  }
  if (typeof category != "number") {
    return "Category id should be a number.";
  }
  if (complexity != "Easy" && complexity != "Medium" && complexity != "Hard") {
    return "Complexity should be Easy, Medium or Hard.";
  }
  if (typeof duration != "number") {
    return "Duration (weeks) should be a number.";
  }
  if (
    technologies &&
    (typeof technologies != "object" ||
      !technologies.every((t: any) => typeof t == "number"))
  ) {
    return "Technologies should be an array of numbers.";
  }
  if (
    coauthors &&
    (typeof coauthors != "object" ||
      !coauthors.every((c: any) => typeof c == "number"))
  ) {
    return "Co-authors should be an array of numbers.";
  }
  return "";
}

export { getIdeaCreationErrors };
