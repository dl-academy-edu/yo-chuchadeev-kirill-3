// Задание 1
// Создать программу, которая запрашивает у пользователя число, в консоль выводит числа от 1 до до этого числа, 
// но пропускает числа, которые кратны (делятся без остатка) 4-м.

// let userNumber = +prompt("Your number:");
// let number = 0;

// if(!userNumber) {
// 	alert("Вы не ввели число!");
// } else {
// 	while (number < userNumber) {
// 		number++;
// 		number % 4 ? console.log(number) : "";
// 	}
// }





// Задание 2
// Написать программу, которая будет получать число и с помощью цикла while считать его факториал.


// let userNumber = +prompt("Your number:");
// let num = 1;

// if(!userNumber) {
// 	alert("Вы не ввели число!");
// } else {
// 	for (i = userNumber; i > 1; i--) {
// 		num *= i;
// 	}
// }

// console.log (num);




// Задание 3
// Написать программу, которая будет получать число и его степень, с помощью цикла for возвести число в степень.

// let userNumber = +prompt("Your number:");
// let userDegree = +prompt("Your degree:");
// let num = 1;

// if((!userNumber) || (!userDegree)) {
// 	alert("Вы не ввели число!");
// } else {
// 	for (i = 0; i < userDegree; i++) {
// 		num = num * userNumber;
// 	}
// }

// console.log(num);




// Задание 4
// Написать проверку, для программ 1-3, чтобы если пользователь вводил неверные данные, 
// например слово вместо числа, то должно вывестись сообщение об ошибке.




// Задание 5
// Написать игру “Угадай число”, для генерации случайного числа использовать следующий код:
// let rand = Math.floor(1 + Math.random() * 10);
// Игра должна продолжаться до тех пор, пока пользователь не укажет правильное число. 
// Можете использовать пустой for или while(true).

let rand = Math.floor(1 + Math.random() * 10);
let userNum;

console.log(rand);
do {
	userNum = +prompt('Угадайте число, от 1 до 10. Введите свое:');
} while(userNum !== rand) console.log('Вы угадали!');