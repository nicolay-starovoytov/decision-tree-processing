# Decision tree processing solution

Solution for decision tree processing

# Setup

## Local setup (development)

To setup service, need to first install nodejs (>= v24), npm and git. Then follow these steps:

1. Clone the repository:

`git clone https://github.com/nicolay-starovoytov/decision-tree-processing`

2. Go to the created folder:

`cd decision-tree-processing`

3. Install dependencies:

`npm i`

## Income tree structure

Current solution supports not only tree, but also forest (multiple trees) since we want to be able to execute several actions in a chain.

The income tree should be in JSON format. Base format:

```json
{
  "actions": [
    {}, {}, ...
  ]
}
```

where each object is action of specific type.

Tree can contain 4 types of actions:

1. Send SMS. The structure of action:

```json
{
  "type": "SEND_SMS",
  "phoneNumber": "+1234567890",
  "message": "Your message here"
}
```

2. Send Email. The structure of action:

```json
{
  "type": "SEND_EMAIL",
  "sender": "sender@mail.com",
  "receiver": "receiver@mail.com",
  "message": "Your message here"
}
```

3. Condition. Evaluates Javascript expression and running appropriate action. The structure:

```json
{
  "type": "CONDITION",
  "expression": "5 > Math.random() * 10",
  "trueActions": [{...}, {...}, ...],
  "falseActions": [{...}, {...}, ...]
}
```

4. Loop. Evaluates Javascript expression and running appropriate action. The structure:

```json
{
  "type": "LOOP",
  "count": 10,
  "subtree": [{...}, {...}, ...]
}
```

## Examples of trees that can be processed:

1. Christmas Greeting

```json
{
  "actions": [
    {
      "type": "CONDITION",
      "expression": "(new Date()).getDate() === 1 && (new Date()).getMonth() === 0",
      "trueActions": [
        {
          "type": "SEND_SMS",
          "phoneNumber": "+1234567890",
          "message": "Happy Christmas"
        }
      ],
      "falseActions": []
    }
  ]
}
```

2. Chained actions

```json
{
  "actions": [
    {
      "type": "SEND_EMAIL",
      "sender": "sender@mail.com",
      "receiver": "receiver@mail.com",
      "message": "Your message here"
    },
    {
      "type": "SEND_SMS",
      "phoneNumber": "+1234567890",
      "message": "Your message here"
    },
    {
      "type": "SEND_EMAIL",
      "sender": "sender@mail.com",
      "receiver": "receiver@mail.com",
      "message": "Your message here"
    }
  ]
}
```

3. Send optional emails

```json
{
  "actions": [
    {
      "type": "LOOP",
      "count": 10,
      "subtree": [
        {
          "type": "CONDITION",
          "expression": "5 > Math.random() * 10",
          "trueActions": [
            {
              "type": "SEND_SMS",
              "phoneNumber": "+1234567890",
              "message": "Notification"
            }
          ],
          "falseActions": []
        }
      ]
    }
  ]
}
```

## Running the solution

To run the solution, from the folder of projece, use the following command:

`npm start -- --tree='{{DECISION_TREE_JSON}}'`

### Example

`npm start -- --tree='{"actions":[{"type":"LOOP","count":10,"subtree":[{"type":"CONDITION","expression":"5 > Math.random() * 10","trueActions":[{"type":"SEND_SMS","phoneNumber":"+1234567890","message":"Notification"}],"falseActions":[]}]}]}'`

## Test

To run tests, use the command:

`npm test`

## Format

To format code, use the command:

`npm run format`

## Check style and lint

To check code style, use the command:

`npm run lint`
