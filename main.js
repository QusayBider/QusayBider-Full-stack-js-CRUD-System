const name = document.querySelector("#courseName");
const category = document.querySelector("#courseCategory");
const price = document.querySelector("#coursePrice");
const description = document.querySelector("#courseDescription");
const capacity = document.querySelector("#courseCapacity");
const addBtn = document.querySelector("#clickAdd");
const removeBtn = document.querySelector("#clickRemove");
const courseNameError = document.querySelector(".courseNameError");
const courseCategoryError = document.querySelector(".courseCategoryError");
const coursePriceError = document.querySelector(".coursePriceError");
const courseDescriptionError = document.querySelector(".courseDescriptionError");
const courseCapacityError = document.querySelector(".courseCapacityError");
const deleteAllBtn = document.querySelector("#removeBtn");
const search=document.querySelector("#search");
const clearBtn = document.querySelector("#clear");

let courses = [];

if (localStorage.getItem("courses") != null) {
  courses = JSON.parse(localStorage.getItem("courses"));
  displayCourses();
}



addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let ValidFlag = true;
  const namePattern = /[A-Z][a-z]{3,9}/;
  const CategoryPattern = /[A-Z][a-z]{3,9}/;
  const coursePattern=/[0-9]/;
  const DescriptionPattern=/[A-Z][a-z]/;
  const CapacityPattern=/[0-9]/;
  

  if (!namePattern.test(name.value)) {
    courseNameError.innerHTML =
      " Name should start with a capital letter and contain only lowercase letters, numbers, and spaces. Minimum length 4 characters.";
    name.classList.remove("is-valid");
    name.classList.add("is-invalid");
    ValidFlag = false;
  } else {
    courseNameError.innerHTML = "";
    name.classList.remove("is-invalid");
    name.classList.add("is-valid");
  }

  if (!CategoryPattern.test(category.value)) {
    courseCategoryError.innerHTML =
      " Name should start with a capital letter and contain only lowercase letters, numbers, and spaces. Minimum length 4 characters.";
      category.classList.remove("is-valid");
      category.classList.add("is-invalid");
    ValidFlag = false;
  } else {
    courseCategoryError.innerHTML = "";
    category.classList.remove("is-invalid");
    category.classList.add("is-valid");
  }
  
  if (!coursePattern.test(price.value)) {
    coursePriceError.innerHTML =
    " should It contains with numbers";
    price.classList.remove("is-valid");
    price.classList.add("is-invalid");
    ValidFlag = false;
  } else {
    coursePriceError.innerHTML = "";
    price.classList.remove("is-invalid");
    price.classList.add("is-valid");
  }

  if (!DescriptionPattern.test(description.value)) {
    courseDescriptionError.innerHTML =
      " Name should start with a capital letter and contain only lowercase letters, numbers, and spaces. Minimum length 4 characters.";
      description.classList.remove("is-valid");
      description.classList.add("is-invalid");
    ValidFlag = false;
  } else {
    courseDescriptionError.innerHTML = "";
    description.classList.remove("is-invalid");
    description.classList.add("is-valid");
  }
  
  if (!CapacityPattern.test(capacity.value)) {
    courseCapacityError.innerHTML =
      " should It contains with numbers";
      capacity.classList.remove("is-valid");
      capacity.classList.add("is-invalid");
    ValidFlag = false;
  } else {
    courseCapacityError.innerHTML = "";
    capacity.classList.remove("is-invalid");
    capacity.classList.add("is-valid");
  }

  if (ValidFlag ) {
    const course = {
      name: name.value,
      category: category.value,
      price: price.value,
      description: description.value,
      capacity: capacity.value,
    };
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
  Swal.fire({
    title: `${course.name}`,
    text: "New Course added successfully",
    icon: "success",
  });
  displayCourses();
}
});

function displayCourses() {
  const result = courses
    .map((course, index) => {
      return `
        <tr>
        <td>${index + 1}</td>
        <td>${course.name}</td>
        <td>${course.category}</td>
        <td>${course.price}</td>
        <td>${course.description}</td>
        <td>${course.capacity}</td>
        <td>
        <button class="btn btn-danger" onclick="deleteCourse(${index})">Delete</button>
        </td>
        </tr>
        `;
    })
    .join(" ");

  document.querySelector("#data").innerHTML = result;
}

function deleteCourse(index){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // Delete and remove from array and local storage
      courses.splice(index,1);
      localStorage.setItem("courses", JSON.stringify(courses));
       displayCourses();
      //////////////////
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });
  
}


deleteAllBtn.addEventListener("click", ()=>{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // Delete and remove from array and local storage
      courses=[];
      localStorage.setItem("courses", JSON.stringify(courses));
      displayCourses();
      //////////////////
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });
  
})



search.addEventListener("input",(e)=>{
  const KeyWord = search.value;
  const SearchResult=courses.filter((course)=>{
     return course.name.toLowerCase().includes(KeyWord.toLowerCase());
  });
   
  const result = SearchResult
  .map((course, index) => {
    return `
      <tr>
      <td>${index + 1}</td>
      <td>${course.name}</td>
      <td>${course.category}</td>
      <td>${course.price}</td>
      <td>${course.description}</td>
      <td>${course.capacity}</td>
      <td>
      <button class="btn btn-danger" onclick="deleteCourse(${index})">Delete</button>
      </td>
      </tr>
      `;
  })
  .join(" ");

document.querySelector("#data").innerHTML = result;
});

clearBtn.addEventListener("click",()=>{
  document.querySelector(".inputs").innerHTML = " "; 
  courseDescriptionError.innerHTML ="";
  courseNameError.innerHTML ="";
  courseCategoryError.innerHTML ="";
  courseCapacityError.innerHTML ="";
  coursePriceError.innerHTML ="";
  name.classList.remove("is-invalid");
  name.classList.remove("is-valid");
  description.classList.remove("is-invalid");
  description.classList.remove("is-valid");
  category.classList.remove("is-invalid");
  category.classList.remove("is-valid");
  price.classList.remove("is-invalid");
  price.classList.remove("is-valid");
  capacity.classList.remove("is-invalid");
  capacity.classList.remove("is-valid");
});
