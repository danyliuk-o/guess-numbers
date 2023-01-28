document.addEventListener("DOMContentLoaded", function () {
    const table = document.querySelector('table')
    const goButton = document.querySelector('.go-button')
    const clearButton = document.querySelector('.clear-button')
    const message = document.querySelector('.message')
    const min = 1;
    const max = 100
    let tdCount = 1;
    let selectedNumbers = []
    let generatedNumbers = []
    let sameNumbers = []

    const toggleElement = element => {
        if (selectedNumbers.includes(element)) {
            const index = selectedNumbers.indexOf(element)
            selectedNumbers.splice(index, 1)
        } else {
            selectedNumbers.push(element)
        }
    }

    const deleteElement = element => {
        selectedNumbers = selectedNumbers.filter(item => item !== element)
    }

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const clearButtonHandler = () => {
        sameNumbers = []
        generatedNumbers= []
        selectedNumbers = []
        message.innerHTML = '';

        const cells = table.querySelectorAll('td.active');
        cells.forEach(td => {
            td.removeAttribute('class')
        })
    }

    const buttonHandler = () => {
        sameNumbers = []
        message.textContent = '';
        for (let i = 0; generatedNumbers.length < 10;) {
            const newNumber = randomIntFromInterval(min, max)

            if (newNumber === generatedNumbers[i]) {
                continue;
            }

            generatedNumbers.push(String(newNumber))
            i++
        }

        for (let i = 0; i <= selectedNumbers.length - 1; i++) {
            for(let j = 0; j <= generatedNumbers.length - 1; j++ ) {
                if (selectedNumbers[i] === generatedNumbers[j]) {
                    sameNumbers.push(selectedNumbers[i])
                }
            }
        }

        if (sameNumbers.length) {
            const newUl = document.createElement('ul')
            message.appendChild(newUl)
            for (let num of sameNumbers) {
                const newLi = document.createElement('li')
                newLi.textContent = String(num)
                newUl.appendChild(newLi)
            }
        } else {
            const p = document.createElement('p')
            p.textContent = 'You don\'t have any same numbers'
            message.appendChild(p)
        }
    }

    goButton.addEventListener('click', buttonHandler)
    clearButton.addEventListener('click', clearButtonHandler)

    for (let i = 1; i <= 10; i++) {
        const newTr = document.createElement('tr')

        for (let j = 1; j <= 10; j++) {
            const newTd = document.createElement('td')
            newTd.textContent = String(tdCount);
            newTd.dataset.value = String(tdCount)
            tdCount++
            newTr.appendChild(newTd)
            table.appendChild(newTr)
            newTd.addEventListener('click', function () {
                const value = this.getAttribute('data-value')

                if (selectedNumbers.length === 10 && !this.classList.contains('active')) {
                    return
                }

                if (selectedNumbers.length <= 10) {
                    this.classList.toggle('active');
                    toggleElement(value)
                } else {
                    this.classList.remove('active');
                    deleteElement(value)
                }
            });
        }
    }
})








