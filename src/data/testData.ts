
export const testData = [
  {
    id: 1,
    title: "Calculus Midterm Examination",
    type: "Exam",
    subject: "Mathematics",
    date: "2023-10-15",
    time: "10:00 AM",
    duration: 120, // minutes
    status: "upcoming",
    security: [
      "Webcam proctoring required",
      "No browser tab switching allowed",
      "Screen recording during the test"
    ],
    questions: [
      {
        id: 101,
        type: "mcq",
        question: "Which of the following is the derivative of f(x) = x² + 3x + 5?",
        options: [
          "f'(x) = x + 3",
          "f'(x) = 2x + 3",
          "f'(x) = 2x² + 3",
          "f'(x) = 2x"
        ],
        correctAnswer: 1,
        points: 2,
        explanation: "The derivative of f(x) = x² + 3x + 5 is f'(x) = 2x + 3 using the power rule and derivative properties."
      },
      {
        id: 102,
        type: "truefalse",
        question: "The derivative of a constant function is always zero.",
        correctAnswer: true,
        points: 1,
        explanation: "The derivative of a constant is zero because the slope of a horizontal line is zero."
      },
      {
        id: 103,
        type: "shortanswer",
        question: "What is the derivative of f(x) = e^x?",
        correctAnswer: "e^x",
        alternativeAnswers: ["exp(x)", "e^(x)"],
        points: 2,
        explanation: "The derivative of f(x) = e^x is e^x, which is a unique property of the exponential function."
      },
      {
        id: 104,
        type: "mcq",
        question: "What is the integral of f(x) = 2x?",
        options: [
          "F(x) = x² + C",
          "F(x) = x + C",
          "F(x) = 2x² + C",
          "F(x) = x²/2 + C"
        ],
        correctAnswer: 0,
        points: 2,
        explanation: "The integral of f(x) = 2x is F(x) = x² + C. The constant coefficient 2 can be pulled out as a multiplier."
      },
      {
        id: 105,
        type: "descriptive",
        question: "Explain the relationship between differentiation and integration with examples.",
        points: 3
      }
    ]
  },
  {
    id: 2,
    title: "Physics Mechanics Quiz",
    type: "Quiz",
    subject: "Physics",
    date: "2023-10-20",
    time: "2:30 PM",
    duration: 45, // minutes
    status: "upcoming",
    security: [
      "No calculator allowed",
      "Browser lockdown required"
    ],
    questions: [
      {
        id: 201,
        type: "mcq",
        question: "A ball is thrown vertically upward with an initial velocity of 20 m/s. How high will it go?",
        options: [
          "10 m",
          "20 m",
          "40 m",
          "None of the above"
        ],
        correctAnswer: 1,
        points: 2,
        explanation: "Using the formula h = v²/2g, where v = 20 m/s and g = 10 m/s², the maximum height is 20 m."
      },
      {
        id: 202,
        type: "mcq",
        question: "Which of the following is NOT a vector quantity?",
        options: [
          "Velocity",
          "Acceleration",
          "Temperature",
          "Force"
        ],
        correctAnswer: 2,
        points: 1,
        explanation: "Temperature is a scalar quantity as it only has magnitude but no direction."
      },
      {
        id: 203,
        type: "truefalse",
        question: "Newton's third law states that for every action, there is an equal and opposite reaction.",
        correctAnswer: true,
        points: 1,
        explanation: "This is the correct statement of Newton's third law of motion."
      },
      {
        id: 204,
        type: "shortanswer",
        question: "What is the SI unit of pressure?",
        correctAnswer: "pascal",
        alternativeAnswers: ["Pa", "N/m²", "newton per square meter"],
        points: 1,
        explanation: "The SI unit of pressure is the pascal (Pa), which is equivalent to one newton per square meter (N/m²)."
      },
      {
        id: 205,
        type: "descriptive",
        question: "Explain the concept of conservation of energy and give a real-world example.",
        points: 5
      }
    ]
  }
];
