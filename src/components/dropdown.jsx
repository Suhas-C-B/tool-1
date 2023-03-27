import React, { Component } from 'react'

export class DropDown extends Component {

    state = {
        isOpen: false
    }

    toggleDropdown = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

  render() {

    const { isOpen } = this.state;
    const { options } = this.state;

    return (
      <div className='dropdown' >
        <div className='dropdown-header' onClick={this.toggleDropdown} >
            Show Information
        </div>
        {isOpen && (
            <div className='dropdown-options' >
                {options.map((option, index) => (
                    <div key={index} className='dropdown-option' >
                        {option}
                    </div>
                ))}
            </div>
        )}
      </div>
    )
  }
}

export default DropDown