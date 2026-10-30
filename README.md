# Task Manager

## Project Setup

It is recommended to use Node v24 when running the application.

To install packages and dependencies, run `npm install`.

## Running the Application

Run `npm run start` to start the application.

Once running, it is accessible at http://localhost:5173/ in your browser.

## Running tests

Run `npm run test` to run the application test suite.

To view test coverage, run `npm run coverage`. The coverage report is located in `src/task/components/test/coverage`, the `index.html` page can be opened within a browser to view coverage report UI.

## Design Decisions

### UI/UX Design

When designing the UI for this application, my primary goals were to design something that was simple, understandable, and easy to use, while remaining aesthetically pleasing.

Below are some of the design decisions I made to acheive this goal:

- Create a toolbar that is always present at the top of the application to contain important features, such as the application title and the button to add a new task.
- **Information Hierarchy** --> Task name is required and is the most important piece of information, so it has larger and darker text to help it stand out. Additional information such as the due date and description are written in a slightly smaller font and a lighter color. Also used varying font weights to help differentiate information (e.g., "**To-do** • 10/26/2026").
- When the task list is empty, display a message ("No tasks to display") to indicate that the list being empty is not an error.
- Reuse the same dialog for adding and editing tasks to keep the user experience consistent. When editing, pre-populate the fields with the data of the task being edited so the user knows what information they are changing.
- **Visual Appeal** --> Simple color palette, consistent use of color/fonts/spacing across the application, display only the necessary information and keep clutter to a minimum.

### UI Library Usage

I decided to use a UI library to build this application because it allowed me to quickly and easily build the UI design I had in mind. I did not have to spend time manually creating my own components and custom styles, instead I could take the pre-existing components and styles from the library and customize them to fit my design needs. It also helped guarantee consistent component behavior across the application, helping create a more streamlined user experience.

The specific UI library I selected was Material UI (MUI). The reason I chose this library is because of how well-established and widely used it is, meaning there were plenty of resources to refer to for help. The documentation for MUI is also detailed and well-structured, which made it easy for me to find the information I needed to implement one of their components into my application. Additionally, I have past experience using the Angular Material UI library. Because both MUI and Angular Material implement the Material Design standard, I thought they may share some design similarities that would allow me to better understand how to work with the MUI library.

### Feedback after actions

When a user adds edits, or deletes a task, I wanted there to be a message or feedback to indicate if the action was successful. After browsing the MUI docs, I decided that the Snackbar component would be a good fit for acheiving this goal because it is built for the reason of displaying a temporary message to users. I found this to be important for these 3 operations because, depending on the situation, there may not be many visual indicators. For example, if the task list only has 1 item in it, it would be easy to tell if adding a new task was successful. But if the task list had 50 items, it would be a lot more difficult to visually identify if the task was added. Additionally, if the operation returns an error, it is important this gets presented to the user so they know both that the operation failed and the reason why.

For completing a task, I took a slightly different approach. I decided that between the task status changing from "To-do" to "Completed", the color of the task item changing, and the checkbox itself being filled in, there was already enough feedback to convey that the task was successfully marked as completed. Adding the Snackbar would be redundant and add more clutter and information to the screen than was necessary But it is still important to surface information to the user if application fails to mark a task completed, so the Snackbar will still appear if this operation returns an error.

## Accessibility Considerations

### Decisions

When building this application, one of the reasons I decided to use a UI library like MUI is because they have many web accessibility considerations already built in to their components, such as the ability to navigate between different form controls using tab and to change the value of form controls using only keyboard inputs. It also meant that this behavior would be consistent across UI components, allowing for a smoother user experience.

Another aspect I took into consideration was color. When deciding on a color scheme, I was careful to select colors that were high-contrast so that all text and information was easily readable. I also ensured that there was no information that could only be interpreted by color differentiation, as this could prevent someone with color blindness from being able to understand information presented on the screen.

I also ensured that my application had breakpoints in place so it could be used on devices with varying screen sizes, from mobile devices like phones and tablets, to larger screens like laptops and desktop monitors.

### Testing

Below are the methods I used to test the accessibility of my application:

1. Zoomed in the page to 200% on various screen sizes (mobile, tablet, desktop) and ensured the application was still readable and fully functional.
2. Tested that the tab order was logical and that there were no keyboard traps (e.g., on the dialog component, checked that tab moved between the form fields from top to bottom, then to the cancel/submit buttons from left to right, then back to the first form field).
3. Verified that all actions (add/edit/delete/complete) could be completed using only the keyboard and that the appropriate keyboard inputs could be used to control the application (e.g., Escape to close dialog, spacebar to check the checkbox, arrow keys to navigate the item menu, etc.).
4. Turned on Mac VoiceOver and used only keyboard controls to use my application. Checked that the information being read out by the screen reader made sense and could be understood without relying on visual cues in the UI.
5. Ensured all form fields were properly labeled, and used semantic HTML tags when possible.

### Known Limitations

Because due date is an optional field, I wanted to be able to quickly clear the value of that DatePicker component from MUI and reset the date to null. MUI configures this so if `clearable: true` is passed in the slot properties for the DatePicker, it adds an "X" button to clear the field. However, while testing the tab order of my application, I found this button is skipped and is not able to be focused on by pressing tab. The field can still be cleared manually using only the keyboard, but this is not as user-friendly.

## Tradeoffs Made

### Using Context

One tradeoff I made was opting to use React Context for cleaner, more maintainable code at the cost of unit tests being more difficult to write. My initial implementation of this application involved a lot of prop drilling, which made the code difficult to understand and harder to maintain. I discovered Context as a solution to this problem, but as a result I found it more difficult to write unit tests for my components. When I was passing state variables and functions as properties, it was easy for me to mock them in my test files and pass those to the component. But once I switched my components to using Context, I could no longer do this and needed to find a different way to get this information to my components.

At first, the examples I found online did not work for various reasons, such as TypeErrors that could not be resolved or errors when trying to declare useState() within my test files. In the end, the approach I decided on was to set the type of my TaskContext to any. I would have liked to have kept the type specificity, but this change allowed me to essentially mock the TaskContext in my unit tests and implement some of the proposed solutions I found on sites like StackOverflow and GitHub discussions. With more time, I would like explore additional approaches to testing components that use Context and see if there is a solution that allows me to keep the typing of my TaskContext intact.

## Future Improvements

### Fixing the `Property 'toBeInTheDocument' does not exist on type 'Assertion<void, HTMLElement>'` error in tests

One issue I would like to resolve is the `Property 'toBeInTheDocument' does not exist on type 'Assertion<void, HTMLElement>'` error in the IDE for the `.toBeInTheDocument()` calls in tests. None of the solutions presented on StackOverlow, GitHub Issues, or other community resources worked for my environment. After enough time I decided to abandon the issue because the tests were working despite the error, and there were other higher priority items I needed to address. But for someone viewing the application in their IDE it may be confusing to see unresolved errors in the test files, so with more time this is an issue I would like to fix.

### UI Enhancements

Below is a list of UI enhancements I would make with additional time:

- When a task's due date has passed, change the color of the date to red and add an icon text to it (e.g., warning symbol, exclamation point in a circle) to denote that it is overdue.
- The ability to add an optional priority marker to tasks. Tasks can be marked as low, medium, or high priority. This could be displayed in the UI through the use of symbols like exclamation points (!, !!, !!!), adding the priority text to the screen (e.g., to the left of the status + due date, so it would read "Low • To-do • 10/29/2026), or another similar approach.
- Sort tasks by their due date from nearest to furthest. Tasks with no due date automatically get sorted to the bottom.
- The ability to manually reorder tasks in the list.
- When a task is marked as completed, move the task to the bottom of the task list.
