/** This is an alert component that displays an error message. 
 * Props:
 * header: String indicating header message of alert to display
 * text: String indicating body message of alert to display
 */
export default function ErrorAlert({header, text}) {
    return (
      <div
        class="p-4 mb-4 mt-4 text-sm text-red-900 bg-[#FDEDED] rounded-lg "
        role="alert"
      >
        <span class="font-medium">{header}</span> {text}
      </div>
    );
  }
  