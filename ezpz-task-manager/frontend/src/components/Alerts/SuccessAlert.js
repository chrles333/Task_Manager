/** This is an alert component that displays a success message. 
 * Props:
 * header: String indicating header message of alert to display
 * text: String indicating body message of alert to display
 */
export default function SuccessAlert({header, text}) {
  return (
    <div
      class="p-4 mb-4 mt-4 text-sm text-green-900 bg-[#EDF7ED] rounded-lg "
      role="alert"
    >
      <span class="font-medium">{header}</span> {text}
    </div>
  );
}
