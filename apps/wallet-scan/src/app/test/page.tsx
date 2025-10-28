'use client'

import { Button, Card, CardBody, CardHeader, Input, Switch, Chip, Progress, Select, SelectItem } from '@heroui/react'
import { useState } from 'react'

export default function TestPage() {
  const [inputValue, setInputValue] = useState('')
  const [switchValue, setSwitchValue] = useState(false)
  const [selectValue, setSelectValue] = useState('option1')

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Hero UI Test Page</h1>
          <p className="text-lg text-muted-foreground">
            Testing all Hero UI components to ensure provider is working correctly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buttons */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Buttons</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button color="default">Default</Button>
                <Button color="primary">Primary</Button>
                <Button color="secondary">Secondary</Button>
                <Button color="success">Success</Button>
                <Button color="warning">Warning</Button>
                <Button color="danger">Danger</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="solid">Solid</Button>
                <Button variant="bordered">Bordered</Button>
                <Button variant="light">Light</Button>
                <Button variant="flat">Flat</Button>
                <Button variant="faded">Faded</Button>
                <Button variant="shadow">Shadow</Button>
              </div>
            </CardBody>
          </Card>

          {/* Form Elements */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Form Elements</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input
                label="Text Input"
                placeholder="Enter text..."
                value={inputValue}
                onValueChange={setInputValue}
              />
              <Input
                label="Email Input"
                type="email"
                placeholder="Enter email..."
                variant="bordered"
              />
              <Switch
                isSelected={switchValue}
                onValueChange={setSwitchValue}
              >
                Toggle Switch
              </Switch>
              <Select
                label="Select Option"
                placeholder="Choose an option"
                defaultSelectedKeys={[selectValue]}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string
                  setSelectValue(selectedKey)
                }}
              >
                <SelectItem key="option1">Option 1</SelectItem>
                <SelectItem key="option2">Option 2</SelectItem>
                <SelectItem key="option3">Option 3</SelectItem>
              </Select>
            </CardBody>
          </Card>

          {/* Status Elements */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Status Elements</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Chip color="default">Default</Chip>
                <Chip color="primary">Primary</Chip>
                <Chip color="secondary">Secondary</Chip>
                <Chip color="success">Success</Chip>
                <Chip color="warning">Warning</Chip>
                <Chip color="danger">Danger</Chip>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Progress Bar</p>
                <Progress value={65} color="primary" />
                <Progress value={40} color="success" />
                <Progress value={80} color="warning" />
              </div>
            </CardBody>
          </Card>

          {/* Interactive Test */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Interactive Test</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If you can see and interact with all these components, Hero UI is working correctly!
              </p>
              <div className="space-y-2">
                <p className="text-sm">Input Value: <code>{inputValue || 'empty'}</code></p>
                <p className="text-sm">Switch: <code>{switchValue ? 'on' : 'off'}</code></p>
                <p className="text-sm">Selected: <code>{selectValue}</code></p>
              </div>
              <Button
                color="success"
                onPress={() => alert('Hero UI is working!')}
                className="w-full"
              >
                Test Alert
              </Button>
            </CardBody>
          </Card>
        </div>

        <div className="text-center">
          <Button color="primary" variant="bordered" as="a" href="/">
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}