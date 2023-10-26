
function formatNumber(number) {
    if (number === 0) {
        return '0';
    } else {
        return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}

function calculateAmortization() {
    var 대출금액 = parseFloat(document.getElementById('loanAmount').value.replace(/,/g, ''));
    var 연이자율 = parseFloat(document.getElementById('interestRate').value) / 100;
    var 대출기간 = parseInt(document.getElementById('loanTerm').value);
    var 거치기간 = parseInt(document.getElementById('gracePeriod').value) || 0;

    var 월이자율 = 연이자율 / 12;

    var 표 = document.getElementById('amortizationTable');
    var 요약표 = document.getElementById('summaryTable');
    표.innerHTML = '';
    요약표.style.display = 'none';

    var 잔여대출잔액 = 대출금액;
    var 총이자액 = 0;

    var 행 = 표.insertRow();
    var 헤더1 = 행.insertCell(0);
    var 헤더2 = 행.insertCell(1);
    var 헤더3 = 행.insertCell(2);
    var 헤더4 = 행.insertCell(3);
    var 헤더5 = 행.insertCell(4);

    헤더1.innerHTML = '월';
    헤더2.innerHTML = '납입 금액';
    헤더3.innerHTML = '원금 상환액';
    헤더4.innerHTML = '이자 상환액';
    헤더5.innerHTML = '잔여 대출 잔액';

    for (var 월 = 1; 월 <= 대출기간; 월++) {
        var 월납입액;
        var 원금상환액;
        var 이자상환액 = 잔여대출잔액 * 월이자율;

        if (월 <= 거치기간) {
            월납입액 = 이자상환액;
            원금상환액 = 0;
        } else {
            월납입액 = 대출금액 / (대출기간 - 거치기간);
            원금상환액 = 월납입액 - 이자상환액;
        }

        잔여대출잔액 -= 원금상환액;
        총이자액 += 이자상환액;

        var 줄 = 표.insertRow();
        var 셀1 = 줄.insertCell(0);
        var 셀2 = 줄.insertCell(1);
        var 셀3 = 줄.insertCell(2);
        var 셀4 = 줄.insertCell(3);
        var 셀5 = 줄.insertCell(4);

        셀1.innerHTML = 월;
        셀2.innerHTML = formatNumber(월납입액);
        셀3.innerHTML = formatNumber(원금상환액);
        셀4.innerHTML = formatNumber(이자상환액);
        셀5.innerHTML = formatNumber(잔여대출잔액);
    }

    요약표.style.display = 'block';
    document.getElementById('totalInterest').innerHTML = formatNumber(총이자액);
    document.getElementById('totalPayment').innerHTML = formatNumber(대출금액 + 총이자액);
}

// 'return' 키 또는 'enter' 키를 누를 때 계산 함수 실행
document.getElementById('loanTerm').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        calculateAmortization();
    }
});

// 대출 금액 입력란에 숫자를 입력할 때 3자리마다 쉼표 추가
document.getElementById('loanAmount').addEventListener('keyup', function(event) {
    var input = event.target;
    var value = input.value.replace(/[^\d]/g, '');
    input.value = formatNumber(value);
});
