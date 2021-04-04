import { Meta, Story } from '@storybook/react'
import Heading, { IHeadingProps } from 'components/Heading'
import MenuProvider from 'contexts/MenuContext'
import React from 'react'

export default {
  title: 'Components/Heading',
  component: Heading,
} as Meta

const Template: Story<IHeadingProps> = (args) => (
  <MenuProvider>
    <Heading {...args} />
  </MenuProvider>
)

export const Primary = Template.bind({})
Primary.args = {
  title: 'Title',
} as IHeadingProps
