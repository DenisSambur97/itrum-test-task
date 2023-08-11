function ListNode(val, next) {
      this.val = (val===undefined ? 0 : val) //значение узла
      this.next = (next===undefined ? null : next) //указатель
  }

/**
 * @param {ListNode} l1 - список 1
 * @param {ListNode} l2 - список 2
 * @return {ListNode} - список суммы двух чисел
 */
const addTwoNumbers = function(l1, l2) {
    let dummyHead = new ListNode(0); // фиктивная голова нового списка
    let current = dummyHead; // указатель на текущий узел нового списка
    let carry = 0; // переменная для хранения переноса при сложении

    // проходим по спискам, пока хотя бы один из них не закончится
    while (l1 || l2) {
        let sum = carry; // сумма значения переноса
        if (l1) {
            sum += l1.val; // добавляем значение из первого списка
            l1 = l1.next; // переход
        }
        if (l2) {
            sum += l2.val;
            l2 = l2.next;
        }

        carry = Math.floor(sum / 10); // вычисляем новый перенос
        current.next = new ListNode(sum % 10); // добавляем узел с остатком от деления на 10
        current = current.next; // переходим к следующему узлу нового списка
    }

    // если остался перенос, добавляем его в новый список
    if (carry > 0) {
        current.next = new ListNode(carry);
    }

    return dummyHead.next;
};

const l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
const l2 = new ListNode(5, new ListNode(6, new ListNode(4)));

const sumList = addTwoNumbers(l1, l2);
console.log(sumList);