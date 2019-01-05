(function() {

  function onReady(yourMethod) {
    if (document.readyState === 'complete') {
      setTimeout(yourMethod, 1);
    }
    else {
      let readyStateCheckInterval = setInterval(() => {
        if (document.readyState === 'complete') {
          clearInterval(readyStateCheckInterval);
          yourMethod();
        }
      }, 10);
    }
  }

  onReady(() => {
  
    let dFaSelectContainers = [...document.getElementsByClassName('d-fa-select')]

    if (dFaSelectContainers.length > 0) {

      let dFaOptions = []
      let prefix = dFaSelectContainers[0].getAttribute('data-fontawesome-prefix')

      const weights = {
        'fab': '400',
        'fas': '900',
        'far': '400',
        'fal': '300',
      }

      class Option {
        constructor(option, index) {
          let value = option.value ? option.value.split(',') : ""
          this.stylePrefix = value[0]
          this.icon_id = value[1]
          this.label = option.text
          this.weight = weights[this.stylePrefix]
          this.index = index
        }
        icon() {
          let icon = document.createElement('i')
          icon.setAttribute('class', `${this.stylePrefix} ${prefix}-${this.icon_id} fa-fw`)
          icon.style.fontWeight = this.weight
          return icon
        }
        append(dropdown) {
          let newOption = document.createElement('a')
          newOption.setAttribute('href', 'javascript:void(0)')
          newOption.setAttribute('data-index', this.index)
          if (this.icon_id) {
            newOption.append(this.icon())
          }
          newOption.append(this.label)
          dropdown.append(newOption)
        }
      }

      (function () {
        dFaSelectContainers.forEach(selectContainer => {
          let adminFormRow = selectContainer.closest('.form-row')
          if (adminFormRow) {
            adminFormRow.style.overflow = 'visible'
          }
        })
        const options = dFaSelectContainers[0].getElementsByTagName('select')[0].children
        for (var i = 0; i < options.length; i++) {
          dFaOptions.push(new Option(options[i], i))
        }
      })()

      let dropdowns = {}

      class Dropdown {
        constructor(input) {
          this.input = input
          this.selectContainer = input.parentNode
          this.select = input.previousElementSibling
          dropdowns[this.selectContainer.id] = this
          this.generate()
        }
        getOptions() {
          let value = this.input.value
          if (value == this.input.getAttribute('data-last-selected') && this.input.getAttribute('data-dirty') == "false") {
            return dFaOptions
          } else if (value) {
            return dFaOptions.filter(option => {
              let words = value.toLowerCase().split(/[,]+/)
              let match = words.filter(word => {
                return option.label.toLowerCase().indexOf(word) > -1
              })
              return match.length == words.length
            })
          } else {
            return dFaOptions
          }
        }
        bindings() {
          this.dropdown.addEventListener('click', event => {
            this.selectOption(event)
          })
        }
        generate() {
          let newDropdown = document.createElement('div')
          newDropdown.setAttribute("class", "d-fa-dropdown")
          let options = this.getOptions()
          options.forEach(option => {
            option.append(newDropdown)
          })
          if (this.dropdown) {
            this.selectContainer.removeChild(this.dropdown)
            this.input.setAttribute("data-dirty", true)
          } 
          this.dropdown = this.selectContainer.appendChild(newDropdown)
          this.bindings()
        }
        selectOption(event) {
          let selectedIndex = this.select.selectedIndex
          let newSelectedIndex = event.target.getAttribute('data-index')
          this.select.children[selectedIndex].setAttribute('selected', false)
          this.select.children[newSelectedIndex].setAttribute('selected', true)
          this.input.setAttribute('data-last-selected', event.target.text)
          this.input.setAttribute("data-dirty", false)
          this.input.value = event.target.text
          event.target.blur()
        }
      }

      function getDropdown(event) {
        let dropdown = dropdowns[event.target.parentNode.id]
        if (!dropdown) {
          new Dropdown(event.target)
        } else {
          dropdown.generate()
        }
      }

      let dFaInputs = [...document.getElementsByClassName('d-fa-input')]
      dFaInputs.forEach(input => {
        let select = input.previousElementSibling
        let text = select.children[select.selectedIndex].text
        input.value = text
        input.setAttribute('data-last-selected', text)
        input.setAttribute('data-dirty', false)
        input.addEventListener('click', event => {
          getDropdown(event)
        })
        input.addEventListener('keyup', event => {
          getDropdown(event)
        })
        input.addEventListener('blur', event => {
          let lastSelected = event.target.getAttribute('data-last-selected')
          if (event.target.value != lastSelected) {
            event.target.value = lastSelected ? lastSelected : ''
          }
        })
      })
    }
  })
})();
