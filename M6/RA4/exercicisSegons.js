function calculateAverage() {
    const sum = this.scores.reduce((acc, score) => acc + score, 0);
    this.avgScores = sum / this.scores.length;
    this.overcame = this.avgScores >= 50;
}

const student = {
    name : "Antoni",
    surname : "Batllori",
    scores : [40,25,37,65,72,55]
};

calculateAverage.call(student);
console.log("Student:", student);

const students = [
    {name : "Antoni", surname : "Batllori", scores : [40,75,22,78]},
    {name : "Pere", surname : "Rodríguez", scores : [10,28,85,35]},
    {name : "Josepa", surname : "Rovira", scores : [62,71,23,44]},
    {name : "Joan", surname : "Revert", scores : [14,65,18,88]},
    {name : "Maria", surname : "Palau", scores : [52,45,24,55]}
];

students.forEach(student => {
    calculateAverage.call(student);
    console.log(`${student.name} ${student.surname}: avgScores=${student.avgScores.toFixed(2)}, overcame=${student.overcame}`);
});
