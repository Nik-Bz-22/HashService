function splitArrayInHalf(array) {
    const middleIndex = Math.ceil(array.length / 2); // Находим середину массива, округляя вверх

    const firstHalf = array.slice(0, middleIndex); // Первый массив от начала до середины
    const secondHalf = array.slice(middleIndex); // Второй массив от середины до конца

    return [firstHalf, secondHalf];
}

// Пример использования
// const originalArray = [1, 2, 3, 4, 5, 6, 7];
// const [firstHalf, secondHalf] = splitArrayInHalf(originalArray);

export default splitArrayInHalf;