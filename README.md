# Chinese Newcomers Service Center

This project is designed and developed by a team of UC Berkeley students through one of [Cal Blueprint](https://calblueprint.org/)'s project teams during the 2022-23 academic year.

Learn more about [Chinese Newcomers Service Center](https://chinesenewcomers.org/) and [Cal Blueprint](https://calblueprint.org/).

---

## Getting Started

### Prerequisites

Check your installation of `npm` and `node`:

```sh
node -v
npm -v
```

This project requires node version 16.17.0.

We strongly recommend using a Node version manager like [nvm](https://github.com/nvm-sh/nvm) (for Mac) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (for Windows) to install Node.js and npm. See [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Installation

1. Clone the repo & install dependencies
   1. Clone this repo
      - using SSH (recommended)
        ```sh
        git clone git@github.com:calblueprint/chinese-newcomers.git
        ```
      - using HTTPS
        ```sh
        git clone https://github.com/calblueprint/chinese-newcomers.git
        ```
   2. Enter the cloned directory
      ```sh
      cd chinese-newcomers
      ```
   3. Install Typescript:
      ```sh
      npm install -g typescript
      ```
   4. Install yarn:
      ```sh
      npm install -g yarn
      ```
   5. Install project dependencies. This command installs all packages from [`yarn.lock`](yarn.lock).
      ```sh
      yarn install
      ```
2. Set up secrets:
   1. In the project's root directory (`chinese-newcomers/`), create a new file named `.env`
      ```sh
      touch .env
      ```
   2. Copy the credentials from [Blueprint's internal Notion](https://www.notion.so/calblueprint/Environment-Variables-2d24bb3a8b8c4b369fa620cbe1c8fe49) (access is required) and paste them into the `.env` file.

**Helpful resources**

- [GitHub: Cloning a Repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository)
- [GitHub: Generating SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

### Development environment

- **[VSCode](https://code.visualstudio.com/) (recommended)**
  1. Open the `chinese-newcomers` project in VSCode.
  2. Install recommended workspace VSCode extensions. You should see a pop-up on the bottom right to "install the recommended extensions for this repository".

### Running the app

1. In the project directory, run:
   ```shell
    expo start
   ```
2. To test the app:
   - **Expo Go (Recommended)**: [download Expo Go](https://docs.expo.dev/get-started/installation/#2-expo-go-app-for-android-and) on your phone, **connect to same network as your laptop**, and use your phone camera to scan the QR code displayed in the command line.
   - iOS Simulator: [see Expo docs](https://docs.expo.dev/workflow/ios-simulator/)
   - Android Emulator: [see Expo docs](https://docs.expo.dev/workflow/android-studio-emulator/)

### Troubleshooting

<!-- Add common/known setup issues in toggles here -->
<details>
<summary>Starting the expo app results in `FirebaseError: Firebase: Error (auth/invalid-api-key)` but .env exists with the correct credentials.</summary>

For whatever reason, sometimes the env variables don't get picked up, but adding the following line to [firebaseApp.ts](src/firebase/firebaseApp.ts) usually fixes it.

```js
console.log(firebaseConfig);
```

</details>
