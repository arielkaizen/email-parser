<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

<h2>Description</h2>

<p><a href="https://github.com/nestjs/nest">Nest</a> framework TypeScript starter repository.</p>

<h2>Project setup</h2>

<pre><code>$ npm install
</code></pre>

<h2>Compile and run the project</h2>

<pre><code># development
$ npm run start

# watch mode
$ npm run start:dev
</code></pre>

<h2>Email Service Documentation</h2>

<h3>EmailService</h3>

<p>The <code>EmailService</code> class provides methods to parse emails and extract JSON content from attachments and links.</p>

<h4>Methods</h4>

<ul>
  <li><code>parseEmail(emailPath: string): Promise<JsonFileDto[]></code>
    <ul>
      <li>Parses an email file and extracts JSON content from attachments and links.</li>
      <li><strong>Parameters:</strong>
        <ul>
          <li><code>emailPath</code>: The path to the email file.</li>
        </ul>
      </li>
      <li><strong>Returns:</strong> A promise that resolves to an array of <code>JsonFileDto</code> objects.</li>
    </ul>
  </li>
  <li><code>getJsonAttachments(parsedEmail: ParsedMail): Promise<JsonFileDto[]></code>
    <ul>
      <li>Extracts JSON content from email attachments.</li>
      <li><strong>Parameters:</strong>
        <ul>
          <li><code>parsedEmail</code>: The parsed email object.</li>
        </ul>
      </li>
      <li><strong>Returns:</strong> A promise that resolves to an array of <code>JsonFileDto</code> objects.</li>
    </ul>
  </li>
  <li><code>getJsonByLinks(parsedEmail: ParsedMail): Promise<JsonFileDto[] | undefined></code>
    <ul>
      <li>Extracts JSON content from links found in the email body.</li>
      <li><strong>Parameters:</strong>
        <ul>
          <li><code>parsedEmail</code>: The parsed email object.</li>
        </ul>
      </li>
      <li><strong>Returns:</strong> A promise that resolves to an array of <code>JsonFileDto</code> objects or undefined.</li>
    </ul>
  </li>
  <li><code>getAnchorLinks(parsedEmail: ParsedMail): string[]</code>
    <ul>
      <li>Extracts URLs from anchor links in the email body.</li>
      <li><strong>Parameters:</strong>
        <ul>
          <li><code>parsedEmail</code>: The parsed email object.</li>
        </ul>
      </li>
      <li><strong>Returns:</strong> An array of URLs.</li>
    </ul>
  </li>
</ul>

<h2>Endpoint Documentation</h2>

<h3>EmailController</h3>

<p>The <code>EmailController</code> class provides an endpoint to parse emails and extract JSON content.</p>

<h4>Endpoints</h4>

<ul>
  <li><code>GET /emails/:emailPath</code>
    <ul>
      <li>Parses an email and extracts JSON content.</li>
      <li><strong>Parameters:</strong>
        <ul>
          <li><code>emailPath</code>: The path to the email file.</li>
        </ul>
      </li>
      <li><strong>Responses:</strong>
        <ul>
          <li><code>200</code>: JSON extracted from the email.</li>
          <li><strong>Response Type:</strong> <code>JsonFileDto[]</code></li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

<h2>Example Usage</h2>

<p>To parse an email and extract JSON content, send a GET request to the <code>/emails/:emailPath</code> endpoint with the path to the email file as a parameter.</p>

<p>Example:</p>

<pre><code>curl http://localhost:3000/emails/path/to/email/file.eml
</code></pre>

<h2>License</h2>

<p>Nest is <a href="https://github.com/nestjs/nest/blob/master/LICENSE">MIT licensed</a>.</p>