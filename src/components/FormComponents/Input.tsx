import { Input as FormInput, Label } from 'components/common'
import React, { FC } from 'react'

interface IInputProps {
  label: string
}

//* A Component wrapper that provides label as well as input
//* The `Parameters<T>` gets the parameter list of the function type T
//* And `Parameters<typeof FormInput>[0]` gets the 0th element from the parameter list, so basically it gets the type of props from `FormInput`
const Input: FC<Parameters<typeof FormInput>[0] & IInputProps> = (props) => {
  const { label, name } = props
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <FormInput required id={name} name={name} {...props} />
    </>
  )
}

export default Input
