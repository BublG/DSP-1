const N = 1024;
const maxChange = 0.2;

function harmonicSignal(A, F, f) {
    let data = [];
    for (let n = 0; n <= N; n++) {
        let y = A * Math.sin(2 * Math.PI * F * n / N + f);
        data.push(y);
    }
    return data;
}

function polyharmonicSignal(aFfArray) {
    let data = [];
    for (let n = 0; n <= N; n++) {
        let y = 0;
        for (let j = 0; j < aFfArray.length; j++) {
            y += aFfArray[j][0] * Math.sin(2 * Math.PI * aFfArray[j][1] * n / N + aFfArray[j][2]);
        }
        data.push(y);
    }
    return data;
}

function polyharmonicSignalWithLinearLaw(aFfArray) {
    let data = [];
    let frequencies = []
    for (let i = 0; i < aFfArray.length; i++) {
        frequencies.push(aFfArray[i][1]);
    }
    let period = getPeriod(frequencies);
    for (let n = 0; n <= N; n++) {
        let y = 0;
        let t = n / N;
        for (let j = 0; j < aFfArray.length; j++) {
            y += increaseLinearLaw(aFfArray[j][0], t) * Math.sin(
                2 * Math.PI * increaseLinearLaw(aFfArray[j][1], t) * t
                + increaseLinearLaw(aFfArray[j][2], t));
        }
        data.push(y);
    }
    return data;
}

function increaseLinearLaw(start, x) {
    return maxChange * start * x + start;
}

function decreaseLinearLaw(start, x, period) {
    return (-1) * maxChange / period * start * x + start;
}

function getPeriod(frequencies) {
    return 1 / getGCDMoreThanTwoNumbers(frequencies)
}

function getGCDMoreThanTwoNumbers(input) {
    let j = 0;
    let needModify = true;
    while (needModify) {
        needModify = false;
        for (let i = 0; i < input.length; i++) {
            if (input[i] < 1) {
                for (let j = 0; j < input.length; j++) {
                    input[j] = input[j] * 10;
                }
                needModify = true;
                j++;
            }
        }
    }
    let a, b;
    a = input[0];
    for (let i = 1; i < input.length; i++) {
        b = input[i];
        a = getGCD(a, b);
    }
    while (j-- > 0) {
        a /= 10;
    }
    return a;
}

function getGCD(a, b) {
    if (!b) {
        return a;
    }
    return getGCD(b, a % b);
}

function getLCM(a, b) {
    return a * b / getGCD(a, b);
}

function getLCMMoreThenTwoNumbers(input) {
    let j = 0;
    let needModify = true;
    while (needModify) {
        needModify = false;
        for (let i = 0; i < input.length; i++) {
            if (input[i] < 1) {
                for (let j = 0; j < input.length; j++) {
                    input[j] = input[j] * 10;
                }
                needModify = true;
                j++;
            }
        }
    }
    let n = 1;
    for(let i = 0; i < input.length; ++i){
        n = getLCM(input[i], n);
    }
    while (j-- > 0) {
        n /= 10;
    }
    return n;
}

let task1a = {};
task1a.A = 5;
task1a.F = 1;
task1a.f = [Math.PI / 4, Math.PI / 2, 3 * Math.PI / 4, 0, Math.PI];

let ctx1a = document.getElementById('task1a').getContext('2d');
let chart1a = new Chart(ctx1a, {
    type: 'line',
    data: {
        labels: [...Array(N).keys()],
        datasets: [
            {
                label: `A = ${task1a.A}, f = ${task1a.F}, fi = pi/4`,
                backgroundColor: 'transparent',
                borderColor: 'rgb(255, 99, 132)',
                data: harmonicSignal(task1a.A, task1a.F, task1a.f[0]),
                pointRadius: 1,
                pointHoverRadius: 1
            },
            {
                label: `A = ${task1a.A}, f = ${task1a.F}, fi = pi/2`,
                backgroundColor: 'transparent',
                borderColor: 'rgb(75,78,246)',
                data: harmonicSignal(task1a.A, task1a.F, task1a.f[1]),
                pointRadius: 1,
                pointHoverRadius: 1
            },
            {
                label: `A = ${task1a.A}, f = ${task1a.F}, fi =3pi/4`,
                backgroundColor: 'transparent',
                borderColor: 'rgb(34,218,13)',
                data: harmonicSignal(task1a.A, task1a.F, task1a.f[2]),
                pointRadius: 1,
                pointHoverRadius: 1
            },
            {
                label: `A = ${task1a.A}, f = ${task1a.F}, fi = 0`,
                backgroundColor: 'transparent',
                borderColor: 'rgb(115,19,194)',
                data: harmonicSignal(task1a.A, task1a.F, task1a.f[3]),
                pointRadius: 1,
                pointHoverRadius: 1
            },
            {
                label: `A = ${task1a.A}, f = ${task1a.F}, fi = pi`,
                backgroundColor: 'transparent',
                borderColor: 'rgb(128,112,10)',
                data: harmonicSignal(task1a.A, task1a.F, task1a.f[4]),
                pointRadius: 1,
                pointHoverRadius: 1
            }
        ]
    },

    options: {}
});

let task1b = {};
task1b.A = 1;
task1b.F = [1, 3, 2, 4, 10];
task1b.f = Math.PI;

let ctx1b = document.getElementById('task1b').getContext('2d');
let chart1b = new Chart(ctx1b, {
    type: 'line',
    data: {
        labels: [...Array(N).keys()],
        datasets: [
            {
                label: `A = ${task1b.A}, fi = pi, f = ${task1b.F[0]}`,
                backgroundColor: 'transparent',
                borderColor: 'rgb(255, 99, 132)',
                data: harmonicSignal(task1b.A, task1b.F[0], task1b.f),
                pointRadius: 1,
                pointHoverRadius: 1
            },
            {
                label: `A = ${task1b.A}, fi = pi, f = ${task1b.F[1]}`,
                backgroundColor: 'transparent',
                borderColor: 'rgb(75,78,246)',
                data: harmonicSignal(task1b.A, task1b.F[1], task1b.f),
                pointRadius: 1,
                pointHoverRadius: 1
            },
            {
                label: `A = ${task1b.A}, fi = pi, f = ${task1b.F[2]}`,
                backgroundColor: 'transparent',
                borderColor: 'rgb(34,218,13)',
                data: harmonicSignal(task1b.A, task1b.F[2], task1b.f),
                pointRadius: 1,
                pointHoverRadius: 1
            },
            {
                label: `A = ${task1b.A}, fi = pi, f = ${task1b.F[3]}`,
                backgroundColor: 'transparent',
                borderColor: 'rgb(115,19,194)',
                data: harmonicSignal(task1b.A, task1b.F[3], task1b.f),
                pointRadius: 1,
                pointHoverRadius: 1
            },
            {
                label: `A = ${task1b.A}, fi = pi, f = ${task1b.F[4]}`,
                backgroundColor: 'transparent',
                borderColor: 'rgb(128,112,10)',
                data: harmonicSignal(task1b.A, task1b.F[4], task1b.f),
                pointRadius: 1,
                pointHoverRadius: 1
            }
        ]
    },

    options: {}
});

let task1c = {};
task1c.A = [3, 5, 10, 4, 8];
task1c.F = 4;
task1c.f = Math.PI;

let ctx1c = document.getElementById('task1c').getContext('2d');
let chart1c = new Chart(ctx1c, {
    type: 'line',
    data: {
        labels: [...Array(N).keys()],
        datasets: [
            {
                label: `fi = pi, f = ${task1c.F}, A = ${task1c.A[0]},`,
                backgroundColor: 'transparent',
                borderColor: 'rgb(255, 99, 132)',
                data: harmonicSignal(task1c.A[0], task1c.F, task1c.f),
                pointRadius: 1,
                pointHoverRadius: 1
            },
            {
                label: `fi = pi, f = ${task1c.F}, A = ${task1c.A[1]},`,
                backgroundColor: 'transparent',
                borderColor: 'rgb(75,78,246)',
                data: harmonicSignal(task1c.A[1], task1c.F, task1c.f),
                pointRadius: 1,
                pointHoverRadius: 1
            },
            {
                label: `fi = pi, f = ${task1c.F}, A = ${task1c.A[2]},`,
                backgroundColor: 'transparent',
                borderColor: 'rgb(34,218,13)',
                data: harmonicSignal(task1c.A[2], task1c.F, task1c.f),
                pointRadius: 1,
                pointHoverRadius: 1
            },
            {
                label: `fi = pi, f = ${task1c.F}, A = ${task1c.A[3]},`,
                backgroundColor: 'transparent',
                borderColor: 'rgb(115,19,194)',
                data: harmonicSignal(task1c.A[3], task1c.F, task1c.f),
                pointRadius: 1,
                pointHoverRadius: 1
            },
            {
                label: `fi = pi, f = ${task1c.F}, A = ${task1c.A[4]},`,
                backgroundColor: 'transparent',
                borderColor: 'rgb(128,112,10)',
                data: harmonicSignal(task1c.A[4], task1c.F, task1c.f),
                pointRadius: 1,
                pointHoverRadius: 1
            }
        ]
    },

    options: {}
});

let task2 = [
    [5, 1, Math.PI / 9],
    [5, 2, Math.PI / 4],
    [5, 3, Math.PI / 3],
    [5, 4, Math.PI / 6],
    [5, 5, 0]
]

let ctx2 = document.getElementById('task2').getContext('2d');
let chart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: [...Array(N).keys()],
        datasets: [
            {
                label: '',
                backgroundColor: 'transparent',
                borderColor: 'rgb(255,0,0)',
                data: polyharmonicSignal(task2),
                pointRadius: 1,
                pointHoverRadius: 1
            },
        ]
    },

    options: {}
});

let task3 = [
    [5, 10, Math.PI / 9],
    [5, 20, Math.PI / 4],
    [5, 30, Math.PI / 3],
    [5, 40, Math.PI / 6],
    [5, 50, 0]
]

let ctx3 = document.getElementById('task3').getContext('2d');
let chart3 = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: [...Array(N).keys()],
        datasets: [
            {
                label: '',
                backgroundColor: 'transparent',
                borderColor: 'rgb(255,0,0)',
                data: polyharmonicSignalWithLinearLaw(task3),
                pointRadius: 1,
                pointHoverRadius: 1
            },
        ]
    },

    options: {}
});