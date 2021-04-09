import { Meta, Story } from '@storybook/react'
import Heading, { IHeadingProps } from 'components/Heading'
import MenuProvider from 'contexts/MenuContext'
import React from 'react'
import GlobalStyle from 'utils/style/global'

// as Meta?
export default {
  title: 'Components/Heading',
  component: Heading,
} as Meta

const Template: Story<IHeadingProps> = (args) => (
  <>
    <GlobalStyle />
    <MenuProvider>
      <Heading {...args} />
    </MenuProvider>
  </>
)

// why the bind below?
export const Primary = Template.bind({})
Primary.args = {
  title: 'Title',
} as IHeadingProps
