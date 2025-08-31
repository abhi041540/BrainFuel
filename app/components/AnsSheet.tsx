import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

type QuestionType = {
  question: string;
  options: string[];
};

type AnswerDataType = {
  question: number;
  actual: string;
  marks: boolean;
  selected: string;
};

type Props = {
  questions: QuestionType[];
  ansdata: AnswerDataType[];
};

function AnsSheet() 
{
 const data:any = useLocalSearchParams();
    const ansdata1:any=JSON.parse(data.ansdata);
    const questions1=JSON.parse(data.questions);
   const { questions, ansdata }: Props={questions:questions1, ansdata:ansdata1}

  const getAnswerMeta = (questionIndex: number) =>
    ansdata.find((entry) => entry.question === questionIndex + 1);

  const renderOption = (
    option: string,
    optionIndex: number,
    questionIndex: number
  ) => {
    const optionLabel = ["A", "B", "C", "D"][optionIndex];
    const answerMeta = getAnswerMeta(questionIndex);

    let backgroundColor = "#F0F0F0";
    let textColor = "#363434ff";

    if (answerMeta) {
      const { actual, selected, marks } = answerMeta;

      if (marks && actual === optionLabel) {
        backgroundColor = "#2ecc71"; 
        textColor = "#fff";
      } else if (!marks) {
        if (actual === optionLabel) {
          backgroundColor = "#2ecc71"; 
          textColor = "#fff";
        } else if (selected === optionLabel) {
          backgroundColor = "#ef230cff"; 
          textColor = "#fff";
        }
      }
    }

    return (
      <View
        key={optionIndex}
        style={[styles.optionButton, { backgroundColor }]}
      >
        <Text style={[styles.optionText, { color: textColor }]}>{option}</Text>
      </View>
    );
  };

  const renderItem = ({
    item,
    index
  }: {
    item: QuestionType;
    index: number;
  }) => (
    <View style={styles.card}>
      <Text style={styles.questionText}>
        {index + 1}. {item.question}
      </Text>
      {item.options.map((option, i) => renderOption(option, i, index))}
    </View>
  );

  return (
    <LinearGradient
      colors={["#faf2eeff", "#d1a79181"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ height: "100%" }}
    >
      <View>
                <Text style={{ fontSize: 25, fontWeight: 700, margin: 4, color: "#260a75ff" }}>
                    {
                        " Quiz Result!"
                    }
                </Text>
            </View>
      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ padding: 16 }}
      />
    </LinearGradient>
  );
}

export default AnsSheet;

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#ffffffff",
    elevation: 3,
    borderColor: "#4140406c",
    borderWidth: 1
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#0d134dff"
  },
  optionButton: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 8
  },
  optionText: {
    fontSize: 16
  }
});
