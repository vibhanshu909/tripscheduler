import { Meta, Story } from '@storybook/react'
import NavMenu from 'components/NavMenu'
import MenuProvider from 'contexts/MenuContext'
import React from 'react'

export default {
  title: 'Components/NavMenu',
  component: NavMenu,
} as Meta

const Template: Story<{}> = (args) => (
  <MenuProvider>
    <NavMenu {...args} />
  </MenuProvider>
)

export const Primary = Template.bind({})
