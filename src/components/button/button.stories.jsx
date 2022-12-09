import { storiesOf } from '@storybook/react'
import Button from './index'

const stories = storiesOf('Button', module)

stories.addDecorator((story) => (
    <div style={{ display: 'flex', height: 40}}>
        {story()}
    </div>
))

stories.add('Button success', () => (
    <Button onClick={() => null} kind='success'>
        Success
    </Button>
))

stories.add('Button danger', () => (
    <Button onClick={() => null} kind='danger'>
        Danger
    </Button>
))
