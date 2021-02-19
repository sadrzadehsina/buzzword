const React = require("react");
const { render, useStdout, Text, Box, useApp } = require("ink");
const TextInput = require("ink-text-input").default;

const { addNewWord, getWords } = require("./db");
const { prepareWordToStore, parseArgs } = require("./utils");
const { useEffect } = require("react");

const Buzzword = () => {
  const [input, setInput] = React.useState("");
  const [words, setWords] = React.useState([]);
	const [message, setMessage] = React.useState();
	const [visible, setVisible] = React.useState(false);

	const showMessage = msg => {
		setVisible(true);
		setMessage(msg);
	};

  const { exit } = useApp();

  const resetInput = () => setInput("");
  const resetList = () => setWords([]);

  const handleInput = () => {
    const { command, rest } = parseArgs(input);

    if (command === "add") {
      const word = prepareWordToStore(rest.join(" "));

      showMessage(`👍 ${word} added`);
      addNewWord({ name: word });
      resetList();
      resetInput();
    } else if (command === "list") {
      setWords(getWords());
      resetInput();
    } else if (command === "exit") {
      showMessage("👋 Bye Bye");
      exit();
    } else {
      showMessage("💣 unknown command");
			resetList();
      resetInput();
    }
  };

	useEffect(() => {

		let timeoutId;

		if (message) setTimeout(() => {
			setMessage();
			setVisible(false);
		}, 1000);

		return () => clearTimeout(timeoutId);

	}, [message]);

  return (
    <>

      {words.length > 0 && (
        <Box width={40}>
          <Box flexShrink={4} width={30}>
            <Text>WORD</Text>
          </Box>
          <Box width={10}>
            <Text>COUNT</Text>
          </Box>
        </Box>
      )}

      {words.map((word) => (
        <Box key={word.name} width={40}>
          <Box flexShrink={4} width={30}>
            <Text>{word.name}</Text>
          </Box>
          <Box width={10}>
            <Text>{word.count}</Text>
          </Box>
        </Box>
      ))}

			{
				visible && <Text>{message}</Text>
			}

      <Box>
        <Box>
          <Text>🐺 buzzword></Text>
        </Box>

        <TextInput value={input} onChange={setInput} onSubmit={handleInput} />
      </Box>
    </>
  );
};

render(<Buzzword />);
