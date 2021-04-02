import { Input as FormInput, Label } from 'components/common'
import React, { FC } from 'react'

const Input: FC<Parameters<typeof FormInput>[0] & { label: string }> = (props) => {
  const { label, name } = props
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <FormInput required id={name} name={name} {...props} />
    </>
  )
}

export default Input
