/* eslint-disable testing-library/no-node-access */
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Accordion from './Accordion'

describe('Accordion component tests', () => {
  afterEach(() => {
    cleanup()
  })

  test('Empty content', () => {
    const content = []
    render(<Accordion content={content} />)

    const accordion = screen.getByTestId('accordion')
    expect(accordion.firstChild).toHaveTextContent('No elements to display')
  })

  test('Some content', () => {
    const content = [
      { title: 'Lorem', text: 'Laborum officia eiusmod commodo laboris dolore voluptate culpa dolore nostrud sint.'},
      { title: 'Ipsum', text: 'Et aliqua Lorem aute in consectetur excepteur enim est.'},
      { title: 'Pariatur', text: 'Pariatur exercitation consequat nisi minim.'},
    ]
    render(<Accordion content={content} />)
    const accordion = screen.getByTestId('accordion')
    expect(accordion.childNodes.length).toBe(3)

    content.forEach(({ title, text }, i) => {
      expect(accordion.childNodes[i]).toHaveTextContent(title)
      expect(accordion.childNodes[i]).toHaveTextContent(text)
    })
  })

  test('Display correct card', () => {
    const content = [
      { title: 'Lorem', text: 'Laborum officia eiusmod commodo laboris dolore voluptate culpa dolore nostrud sint.'},
      { title: 'Ipsum', text: 'Et aliqua Lorem aute in consectetur excepteur enim est.'},
      { title: 'Pariatur', text: 'Pariatur exercitation consequat nisi minim.'},
    ]
    render(<Accordion content={content} />)
    const accordion = screen.getByTestId('accordion')

    expect(accordion.querySelectorAll('.--open').length).toBe(0)

    const cardTitle = screen.getByText(content[0].title)
    const cardText = screen.getByText(content[0].text)
    expect(cardText).not.toHaveClass('--open')
    fireEvent.click(cardTitle)
    expect(cardText).toHaveClass('--open')
  })

})