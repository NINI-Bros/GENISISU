import Submit from './Submit';

export default function Search() {
  return (
    <form action="#">
      <input className="bg-white p-1 mr-2" type="text" name="keyword" />
      <Submit>검색</Submit>
    </form>
  );
}
