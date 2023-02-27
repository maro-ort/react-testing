import React, { FC } from 'react'

type Props = {
  type?: string
  title?: string
  name: string
  value?: string
  readOnly?: boolean
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField: FC<Props> = ({
  type = 'text',
  title = '',
  name,
  value,
  readOnly = false,
  required = false,
  onChange = null,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => !readOnly && onChange?.(e)

  return (
    <label htmlFor={name}>
      {title && <span className="input-title">{title}</span>}
      <input
        onChange={handleChange}
        name={name}
        type={type}
        defaultValue={value}
        readOnly={readOnly}
        required={required}
        {...props}
      />
      <small></small>
    </label>
  )
}

export default InputField
