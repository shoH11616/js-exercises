const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// `math`の全員の合計点
const totalMath = data.reduce((sum, student) => sum + student.math, 0);
console.log(totalMath); // => 530

// クラスAの`chemistry`の平均点
const classAStudents = data.filter((student) => student.class === "A");
const totalChemistryClassA = classAStudents.reduce(
  (sum, student) => sum + student.chemistry,
  0
);
const averageChemistryClassA = totalChemistryClassA / classAStudents.length;
console.log(averageChemistryClassA); // => 45

// 3科目合計点のクラスC内での平均点
const classCStudents = data.filter((student) => student.class === "C");
const totalPointsClassC = classCStudents.reduce(
  (sum, student) => sum + student.math + student.chemistry + student.geography,
  0
);
const averagePointsClassC = totalPointsClassC / classCStudents.length;
console.log(averagePointsClassC); // => 176.66666666666666

// 3科目合計点が最も高い人の`name`
const studentWithHighestTotal = data.reduce(
  (highest, student) => {
    const total = student.math + student.chemistry + student.geography;
    return total > highest.total ? { name: student.name, total } : highest;
  },
  { name: "", total: 0 }
);
console.log(studentWithHighestTotal.name); // => Frank

// 全体の`geography`の標準偏差
// geographyの点数の配列を作成
const geographyScores = data.map((student) => student.geography);
// geographyの点数の平均を計算
const mean =
  geographyScores.reduce((sum, score) => sum + score, 0) /
  geographyScores.length;
// geographyの点数の分散を計算
const variance =
  geographyScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) /
  geographyScores.length;
// geographyの点数の標準偏差を計算
const stdDev = Math.sqrt(variance);
console.log(stdDev); // => 22.3330569358242
