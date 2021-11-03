import { render, screen } from '@testing-library/react'

import { Todo } from './'

const todos = {
  id: 1,
  title: 'Get Data',
  isCompleted: false,
  order: 1,
}

describe('Todo component', () => {
  test('Todo renders' , () => {
    const { getByText, queryByTestId } = render(<Todo todo={todos} />)

    expect(getByText('Get Data')).toBeInTheDocument()
    expect(queryByTestId('todoWrapper')).toBeInTheDocument()
  })
})

