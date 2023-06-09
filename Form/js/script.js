/* ======== TABS ========== */
// JavaScript
function changeTab(event, tabId) {
    // Get all tab buttons and tab contents
    var tabButtons = document.getElementsByClassName('tab-button');
    var tabContents = document.getElementsByClassName('tab-content');

    // Remove 'active' class from all tab buttons and tab contents
    for (var i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove('active');
    }
    for (var i = 0; i < tabContents.length; i++) {
      tabContents[i].classList.remove('active');
    }

    // Add 'active' class to the selected tab button and tab content
    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  }
/* ======== TABS ========== */




/* ======== FORM BUILDER ========== */
// JavaScript
document.getElementById("field-type").addEventListener("change", function() {
    var fieldType = this.value;
    var fieldOptions = document.getElementById("field-options");

    if (fieldType === "multiple-choice" || fieldType === "checkboxes" || fieldType === "dropdown") {
      fieldOptions.style.display = "block";
    } else {
      fieldOptions.style.display = "none";
    }
  });

  document.getElementById("add-question-button").addEventListener("click", function(event) {
    event.preventDefault();

    // Retrieve question label and type
    var questionLabel = document.getElementById("field-label").value;
    var questionType = document.getElementById("field-type").value;
    var questionOptionsInput = document.getElementById("field-options-input").value;

    // Create question container
    var questionContainer = document.createElement("div");
    questionContainer.classList.add("form-preview-form");

    // Create label element
    var labelElement = document.createElement("label");
    labelElement.textContent = questionLabel;

    // Create input/select/textarea element based on question type
    var inputElement;
    if (questionType === "paragraph") {
      inputElement = document.createElement("textarea");
    } else if (questionType === "multiple-choice" || questionType === "checkboxes") {
      inputElement = document.createElement("div");
      var options = questionOptionsInput.split("\n");
      for (var i = 0; i < options.length; i++) {
        var optionLabel = document.createElement("label");
        var optionInput = document.createElement("input");
        if (questionType === "multiple-choice") {
          optionInput.type = "radio";
          optionInput.name = "radio-question";
        } else {
          optionInput.type = "checkbox";
          optionInput.name = "checkbox-question";
        }
        optionLabel.appendChild(optionInput);
        optionLabel.appendChild(document.createTextNode(options[i].trim()));
        inputElement.appendChild(optionLabel);
      }
    } else if (questionType === "dropdown") {
      inputElement = document.createElement("select");
      var options = questionOptionsInput.split("\n");
      for (var i = 0; i < options.length; i++) {
        var optionElement = document.createElement("option");
        optionElement.text = options[i].trim();
        inputElement.add(optionElement);
      }
    } else if (questionType === "file") {
      inputElement = document.createElement("input");
      inputElement.type = "file";
    } else if (questionType === "date") {
      inputElement = document.createElement("input");
      inputElement.type = "date";
    } else if (questionType === "time") {
      inputElement = document.createElement("input");
      inputElement.type = "time";
    } else {
      inputElement = document.createElement("input");
      inputElement.type = "text";
    }

    // Set attributes for the input element
    inputElement.name = "question-input";

    // Append label and input/select/textarea element to question container
    questionContainer.appendChild(labelElement);
    questionContainer.appendChild(inputElement);

    // Append question container to generated form
    var generatedForm = document.getElementById("generated-form");
    generatedForm.appendChild(questionContainer);

    // Clear question label and options
    document.getElementById("field-label").value = "";
    document.getElementById("field-options-input").value = "";
    document.getElementById("field-type").selectedIndex = 0;
    document.getElementById("field-options").style.display = "none";
  });

  document.getElementById("save-form-button").addEventListener("click", function() {
    var generatedForm = document.getElementById("generated-form");
    var formHTML = generatedForm.outerHTML;
    localStorage.setItem("formHTML", formHTML);
    window.location.href = "form_preview.html";
  });
/* ======== FORM BUILDER ========== */