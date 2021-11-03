import { render, fireEvent } from '@testing-library/react'
import { TodoForm } from '.'

describe('TodoForm component', () => {
  test('TodoFrom renders' , () => {
    const handleClick = jest.fn()
    const { queryByTestId } = render(<TodoForm />)

    expect(queryByTestId('addForm')).toBeInTheDocument()
    expect(queryByTestId('addInput')).toBeInTheDocument()
    expect(queryByTestId('addButton')).toBeInTheDocument()
    fireEvent.change(queryByTestId('addInput'), {target: {value: 'Run test'}})
    expect(queryByTestId('addInput')).toHaveValue('Run test')
  })
})