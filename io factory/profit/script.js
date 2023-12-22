const timeUnit = [4, 5, 10];
const earnings = [1000, 1500, 3000];

function main() {
  const n = parseInt(prompt("Enter the Time unit: "));

  if (n < timeUnit[0]) {
    console.log("Earnings: $0");
    console.log("Solution:\nT: 0, P: 0, C: 0");
  } else {
    const { totalEarnings, solutions } = find(n);
    console.log("Earnings: $" + totalEarnings);
    console.log("Solutions:");
    solutions.forEach((solution, index) => {
      console.log(
        `${index + 1}. T: ${solution[0]}, P: ${solution[1]}, C: ${solution[2]}`
      );
    });
  }
}

function find(n) {
  let totalEarnings = 0;
  const solutions = [];

  function calculateEarnings(T, P, C) {
    return T * earnings[0] + P * earnings[1] + C * earnings[2];
  }

  function generateSolutions(T, P, C, remainingTime) {
    if (remainingTime === 0) {
      const currentEarnings = calculateEarnings(T, P, C);
      if (currentEarnings > totalEarnings) {
        totalEarnings = currentEarnings;
        solutions.length = 0; // Clear previous solutions
        solutions.push([T, P, C]);
      } else if (currentEarnings === totalEarnings) {
        solutions.push([T, P, C]);
      }
      return;
    }

    if (remainingTime >= timeUnit[0]) {
      generateSolutions(T + 1, P, C, remainingTime - timeUnit[0]);
    }

    if (remainingTime >= timeUnit[1]) {
      generateSolutions(T, P + 1, C, remainingTime - timeUnit[1]);
    }

    if (remainingTime >= timeUnit[2]) {
      generateSolutions(T, P, C + 1, remainingTime - timeUnit[2]);
    }
  }

  generateSolutions(0, 0, 0, n);
  return { totalEarnings, solutions };
}

main();
